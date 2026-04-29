import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function CursorTileCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isMobile, prefersReducedMotion } = useMediaQuery()

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return
    const canvas = canvasRef.current
    const heroEl = document.querySelector('#hero section') as HTMLElement
    if (!canvas || !heroEl) return

    let disposed = false

    // Listen for overlay-change events to hide/show
    const onOverlayChange = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail?.open) {
        canvas.classList.add('tile-hidden')
      } else {
        canvas.classList.remove('tile-hidden')
      }
    }
    window.addEventListener('overlay-change', onOverlayChange)

    const gltfLoader = new GLTFLoader()
    gltfLoader.load('/img/tile_cursor.glb', (gltf) => {
      if (disposed) return
      const tileScene = gltf.scene

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
      camera.position.z = 8

      // Normalize tile size
      const box = new THREE.Box3().setFromObject(tileScene)
      const size = new THREE.Vector3(); box.getSize(size)
      const center = new THREE.Vector3(); box.getCenter(center)
      const s = 1.0 / size.y
      tileScene.scale.multiplyScalar(s)
      tileScene.position.set(-center.x * s, -center.y * s, -center.z * s)

      const tileGroup = new THREE.Group()
      tileGroup.add(tileScene)

      // Glow sprite
      const glowTex = (() => {
        const w = 256, h = 320
        const c = document.createElement('canvas'); c.width = w; c.height = h
        const ctx = c.getContext('2d')!
        ctx.save()
        ctx.filter = 'blur(28px)'
        ctx.fillStyle = 'rgba(255,180,80,0.35)'
        ctx.beginPath()
        ctx.roundRect(50, 50, w - 100, h - 100, 20)
        ctx.fill()
        ctx.restore()
        return new THREE.CanvasTexture(c)
      })()

      const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.45,
      }))
      glowSprite.scale.set(1.3, 1.6, 1)
      glowSprite.position.z = -0.1
      tileGroup.add(glowSprite)
      scene.add(tileGroup)

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const keyLight = new THREE.DirectionalLight(0xfff5e0, 0.9)
      keyLight.position.set(3, 2, 6); scene.add(keyLight)
      const fillLight = new THREE.DirectionalLight(0xffeedd, 0.35)
      fillLight.position.set(-3, -1, 5); scene.add(fillLight)
      const backLight = new THREE.DirectionalLight(0xffddc0, 0.5)
      backLight.position.set(0, 2, -5); scene.add(backLight)
      const rimLight = new THREE.PointLight(0xff6622, 1.8, 8)
      rimLight.position.set(0, 0, -1.5); scene.add(rimLight)

      // State
      let targetX = 0, targetY = 0, curX = 0, curY = 0, velX = 0, velY = 0
      let isInHero = false, isOverCta = false, isInBottomArea = false
      let flipYTarget = 0, rotZTarget = 0

      tileGroup.visible = false
      canvas.style.opacity = '0'

      const onMouseMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth) * 2 - 1
        targetY = -(e.clientY / window.innerHeight) * 2 + 1

        // Check hero bounds
        const rect = heroEl.getBoundingClientRect()
        const wasIn = isInHero
        isInHero = e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top && e.clientY <= rect.bottom
        if (isInHero && !wasIn && !isOverCta) { tileGroup.visible = true; canvas.style.opacity = '1' }
        if (!isInHero && wasIn) { tileGroup.visible = false; canvas.style.opacity = '0' }

        // Bottom area detection
        const BOTTOM_THRESHOLD = 0.6
        const relY = (e.clientY - rect.top) / rect.height
        const inBottom = isInHero && relY > BOTTOM_THRESHOLD

        const el = document.elementFromPoint(e.clientX, e.clientY)
        const clickable = el && (el.closest('a') || el.closest('button') || el.closest('.nav-btn') || el.closest('.nav-container'))

        const heroPlayBtn = document.getElementById('heroPlayBtn')

        if (inBottom) {
          isInBottomArea = true; isOverCta = false
          flipYTarget = Math.PI; rotZTarget = Math.PI / 2
          if (heroPlayBtn) heroPlayBtn.style.opacity = '0'
          if (isInHero) { tileGroup.visible = true; canvas.style.opacity = '1' }
        } else if (clickable && !inBottom) {
          isOverCta = true; isInBottomArea = false
          flipYTarget = 0; rotZTarget = 0
          if (heroPlayBtn) heroPlayBtn.style.opacity = '1'
          canvas.style.opacity = '0'
        } else {
          isOverCta = false; isInBottomArea = false
          flipYTarget = 0; rotZTarget = 0
          if (heroPlayBtn) heroPlayBtn.style.opacity = '1'
          if (isInHero) canvas.style.opacity = '1'
        }
      }
      document.addEventListener('mousemove', onMouseMove, { passive: true })

      // Click in bottom area
      const onClick = (e: MouseEvent) => {
        if (!isInBottomArea) return
        const el = e.target as HTMLElement
        if (el.closest('a') || el.closest('button')) return
        window.location.href = 'https://game.mstardev.com/login'
      }
      heroEl.addEventListener('click', onClick)

      const startTime = performance.now() / 1000
      const targetQuat = new THREE.Quaternion()
      const currentQuat = new THREE.Quaternion()
      const euler = new THREE.Euler()
      let animId: number

      function animate() {
        animId = requestAnimationFrame(animate)
        if (disposed || !isInHero) return

        const t = performance.now() / 1000 - startTime

        const prevX = curX, prevY = curY
        curX += (targetX - curX) * 0.08
        curY += (targetY - curY) * 0.08
        velX = curX - prevX
        velY = curY - prevY
        const speed = Math.sqrt(velX * velX + velY * velY)

        tileGroup.position.set(curX * 4.5, curY * 2.5 + Math.sin(t * 2.0) * 0.06, 0)

        const tiltX = -velY * 18 + Math.sin(t * 1.1) * 0.08 + Math.sin(t * 0.4) * 0.04
        const tiltY = velX * 18 + Math.cos(t * 0.9) * 0.08 + Math.cos(t * 0.35) * 0.04 + flipYTarget
        const tiltZ = -velX * 10 + Math.sin(t * 0.7) * 0.05 + rotZTarget

        euler.set(tiltX, tiltY, tiltZ)
        targetQuat.setFromEuler(euler)
        currentQuat.copy(tileGroup.quaternion)
        currentQuat.slerp(targetQuat, 0.1)
        tileGroup.quaternion.copy(currentQuat)

        const pulse = Math.sin(t * 2.0) * 0.05 + Math.sin(t * 3.5) * 0.025
        glowSprite.material.opacity = Math.min(0.55, 0.35 + speed * 2.5 + pulse)
        const gw = 1.3 + speed * 0.4 + Math.sin(t * 1.4) * 0.03
        const gh = 1.6 + speed * 0.5 + Math.sin(t * 1.7) * 0.04
        glowSprite.scale.set(gw, gh, 1)
        rimLight.position.set(tileGroup.position.x, tileGroup.position.y, -1.5)

        if (canvas && !canvas.classList.contains('tile-hidden')) {
          renderer.render(scene, camera)
        }
      }
      animId = requestAnimationFrame(animate)

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)

      return () => {
        disposed = true
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        document.removeEventListener('mousemove', onMouseMove)
        heroEl.removeEventListener('click', onClick)
        renderer.dispose()
      }
    })

    return () => {
      disposed = true
      window.removeEventListener('overlay-change', onOverlayChange)
    }
  }, [isMobile, prefersReducedMotion])

  if (isMobile || prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      id="tileCursorCanvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'opacity 0.4s ease, visibility 0s 0.4s',
      }}
    />
  )
}
