import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TILE_FACE_IMAGES } from '@/data/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function BgTilesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const { isMobile, prefersReducedMotion } = useMediaQuery()

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    const heroEl = document.querySelector('#hero section') as HTMLElement
    if (!canvas || !heroEl) return

    let disposed = false
    const loader = new GLTFLoader()
    const texLoader = new THREE.TextureLoader()
    const texCache: Record<string, THREE.Texture> = {}

    loader.load('/img/tile.glb', (gltf) => {
      if (disposed) return
      const tileTemplate = gltf.scene

      const rect = heroEl.getBoundingClientRect()
      const R = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      R.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      R.setSize(rect.width, rect.height)
      R.setClearColor(0x000000, 0)
      R.toneMapping = THREE.ACESFilmicToneMapping
      R.toneMappingExposure = 1.1

      const scene = new THREE.Scene()
      const cam = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 100)
      cam.position.z = 8

      // Lighting
      scene.add(new THREE.AmbientLight(0xfff0e0, 0.3))
      const key = new THREE.DirectionalLight(0xfff8ee, 0.7)
      key.position.set(3, 4, 6); scene.add(key)
      const fill = new THREE.DirectionalLight(0xffeedd, 0.25)
      fill.position.set(-4, -1, 4); scene.add(fill)
      const rim = new THREE.PointLight(0xff7733, 1.0, 20)
      rim.position.set(0, 1, -4); scene.add(rim)

      function loadFaceTex(imgPath: string) {
        if (texCache[imgPath]) return texCache[imgPath]
        const tex = texLoader.load(imgPath)
        tex.flipY = false
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = R.capabilities.getMaxAnisotropy()
        texCache[imgPath] = tex
        return tex
      }

      function createTile(faceImage: string, opts: any = {}) {
        const clone = tileTemplate.clone(true)
        const box = new THREE.Box3().setFromObject(clone)
        const size = new THREE.Vector3(); box.getSize(size)
        const center = new THREE.Vector3(); box.getCenter(center)
        const s = 1.0 / size.y
        clone.scale.multiplyScalar(s)
        const wrapper = new THREE.Group()
        clone.position.set(-center.x * s, -center.y * s, -center.z * s)
        wrapper.add(clone)

        clone.traverse((child: any) => {
          if (!child.isMesh) return
          if (child.material.name === 'Front_material') {
            child.material = new THREE.MeshPhysicalMaterial({
              map: loadFaceTex(faceImage),
              roughness: opts.faceRoughness ?? 0.12,
              metalness: 0.02,
              clearcoat: opts.faceClearcoat ?? 0.5,
              clearcoatRoughness: opts.faceClearcoatRoughness ?? 0.2,
              transparent: !!opts.transparent,
              opacity: opts.opacity ?? 1.0,
              emissive: new THREE.Color(opts.faceEmissive ?? 0x000000),
              emissiveIntensity: opts.faceEmissiveIntensity ?? 0,
            })
          } else if (child.material.name === 'Back_material') {
            child.material = new THREE.MeshPhysicalMaterial({
              color: opts.backColor ?? 0xce3300,
              roughness: opts.backRoughness ?? 0.24,
              metalness: 0.0,
              clearcoat: opts.backClearcoat ?? 0.3,
              clearcoatRoughness: 0.3,
              transparent: !!opts.transparent,
              opacity: opts.opacity ?? 1.0,
              emissive: new THREE.Color(opts.backEmissive ?? 0x000000),
              emissiveIntensity: opts.backEmissiveIntensity ?? 0,
            })
          }
        })
        return wrapper
      }

      const desktopConfigs = [
        { x: -5.2, y: 0.8, z: -3.5, s: 0.72, img: 0 },
        { x: -4.6, y: -0.8, z: -4.0, s: 0.62, img: 1 },
        { x: 5.0, y: 0.6, z: -3.5, s: 0.68, img: 2 },
        { x: 4.4, y: -1.5, z: -4.2, s: 0.58, img: 3 },
        { x: -3.6, y: 2.5, z: -3.8, s: 0.55, img: 4 },
        { x: 3.8, y: 2.5, z: -3.8, s: 0.52, img: 5 },
      ]
      const mobileConfigs = [
        { x: -2.8, y: 0.5, z: -3.5, s: 0.74, img: 0 },
        { x: -2.4, y: -0.6, z: -4.0, s: 0.65, img: 1 },
        { x: 2.6, y: 0.4, z: -3.5, s: 0.72, img: 2 },
        { x: 2.2, y: -1.0, z: -4.2, s: 0.60, img: 3 },
        { x: -1.8, y: 1.8, z: -3.8, s: 0.57, img: 4 },
        { x: 2.0, y: 1.8, z: -3.8, s: 0.55, img: 5 },
      ]
      const configs = isMobile ? mobileConfigs : desktopConfigs

      const ORIGIN = { x: 0, y: 0.3, z: -1.5 }
      const ORBIT_RADIUS = 2.2
      const ORBIT_RATIO = 0.55

      const tiles: any[] = []
      configs.forEach((cfg, idx) => {
        const tile = createTile(TILE_FACE_IMAGES[cfg.img], {
          transparent: true, opacity: 0.38,
          faceRoughness: 0.12, faceClearcoat: 0.5, faceClearcoatRoughness: 0.2,
          faceEmissive: 0x553311, faceEmissiveIntensity: 0.22,
          backEmissive: 0x442200, backEmissiveIntensity: 0.2,
        })

        const finalScale = cfg.s
        const introScale = finalScale * 1.7
        tile.scale.multiplyScalar(introScale)

        const slotAngle = (idx / configs.length) * Math.PI * 2
        tile.position.set(
          ORIGIN.x + Math.cos(slotAngle) * ORBIT_RADIUS,
          ORIGIN.y + Math.sin(slotAngle) * ORBIT_RADIUS * ORBIT_RATIO,
          ORIGIN.z + (idx % 2 === 0 ? 0.5 : -0.5)
        )
        tile.rotation.set(
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.25
        )
        tile.traverse((child: any) => {
          if (child.isMesh && child.material) child.material.opacity = 1.0
        })
        scene.add(tile)

        const axis = new THREE.Vector3(
          Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5
        ).normalize()

        tiles.push({
          mesh: tile, axis, slotAngle,
          bx: cfg.x, by: cfg.y, bz: cfg.z,
          introScale, finalScale,
          fx: 0.12 + Math.random() * 0.16, fy: 0.16 + Math.random() * 0.2, fz: 0.08 + Math.random() * 0.1,
          ax: 0.08 + Math.random() * 0.12, ay: 0.1 + Math.random() * 0.18, az: 0.03 + Math.random() * 0.04,
          p: Math.random() * Math.PI * 2,
          rotSpeed: 0.12 + Math.random() * 0.15,
          tumbleSpeed: 0.04 + Math.random() * 0.06,
          tumbleAmp: 0.3 + Math.random() * 0.35,
        })
      })

      const bgTilesLayer = layerRef.current
      const skipIntro = isMobile

      const MOBILE_ORBIT_RADIUS = 3.2
      const MOBILE_ORBIT_RATIO = 0.7
      const MOBILE_ORBIT_SPEED = 0.25
      const MOBILE_ORBIT_CENTER = { x: 0, y: 0.8, z: -3.5 }

      if (skipIntro) {
        tiles.forEach((tl) => {
          tl.mesh.scale.setScalar(tl.finalScale)
          tl.mesh.traverse((child: any) => {
            if (child.isMesh && child.material) child.material.opacity = 0.38
          })
        })
        if (bgTilesLayer) bgTilesLayer.style.zIndex = '1'
      }

      const HOLD_DURATION = 1.6
      const BURST_DURATION = 1.2
      const SETTLE_DURATION = 0.8
      const TOTAL_EXPLODE = BURST_DURATION + SETTLE_DURATION
      const REVEAL_AT = HOLD_DURATION + BURST_DURATION * 0.35
      const DROP_Z_AT = HOLD_DURATION + 0.12
      let heroRevealed = skipIntro
      let tilesDropped = skipIntro
      const animStart = performance.now() / 1000

      function revealHeroContent() {
        if (heroRevealed) return
        heroRevealed = true
        document.querySelectorAll('.hero-intro-hidden').forEach((el) => {
          el.classList.add('hero-revealed')
        })
      }

      function dropTilesBehind() {
        if (tilesDropped) return
        tilesDropped = true
        if (bgTilesLayer) bgTilesLayer.style.zIndex = '1'
      }

      function easeOutExpo(x: number) { return x === 1 ? 1 : 1 - Math.pow(2, -10 * x) }
      function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3) }
      function easeInOutQuad(x: number) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2 }

      let mx = 0, my = 0
      const onMouseMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth) * 2 - 1
        my = -(e.clientY / window.innerHeight) * 2 + 1
      }
      document.addEventListener('mousemove', onMouseMove, { passive: true })

      let visible = true
      const visObs = new IntersectionObserver((e) => { visible = e[0].isIntersecting }, { threshold: 0.05 })
      visObs.observe(heroEl)

      let prevTime = performance.now() / 1000
      const clockStart = prevTime
      let animId: number

      function loop() {
        animId = requestAnimationFrame(loop)
        if (disposed || !visible) return
        const now = performance.now() / 1000
        const dt = now - prevTime
        prevTime = now
        const t = now - clockStart
        const elapsed = now - animStart

        if (elapsed >= DROP_Z_AT && !tilesDropped) dropTilesBehind()
        if (elapsed >= REVEAL_AT && !heroRevealed) revealHeroContent()

        tiles.forEach((tl) => {
          const p = tl.p

          if (skipIntro) {
            const angle = tl.slotAngle + t * MOBILE_ORBIT_SPEED
            const bobY = Math.sin(t * 0.5 + p) * 0.15
            const bobZ = Math.cos(t * 0.3 + p * 0.7) * 0.1
            tl.mesh.position.x = MOBILE_ORBIT_CENTER.x + Math.cos(angle) * MOBILE_ORBIT_RADIUS
            tl.mesh.position.y = MOBILE_ORBIT_CENTER.y + Math.sin(angle) * MOBILE_ORBIT_RADIUS * MOBILE_ORBIT_RATIO + bobY
            tl.mesh.position.z = MOBILE_ORBIT_CENTER.z + bobZ + (tl.slotAngle % 2 === 0 ? 0.3 : -0.3)
            tl.mesh.rotateOnAxis(tl.axis, tl.rotSpeed * dt)
            tl.mesh.rotation.x += Math.sin(t * tl.tumbleSpeed * 10 + p) * tl.tumbleAmp * dt
            tl.mesh.rotation.z += Math.cos(t * tl.tumbleSpeed * 8 + p * 1.5) * tl.tumbleAmp * 0.5 * dt
          } else if (elapsed >= HOLD_DURATION + TOTAL_EXPLODE) {
            tl.mesh.position.x = tl.bx + Math.sin(t * tl.fx + p) * tl.ax + mx * 0.1
            tl.mesh.position.y = tl.by + Math.cos(t * tl.fy + p * 1.3) * tl.ay + my * 0.06
            tl.mesh.position.z = tl.bz + Math.sin(t * tl.fz + p * 0.7) * tl.az
            tl.mesh.rotateOnAxis(tl.axis, tl.rotSpeed * dt)
            tl.mesh.rotation.x += Math.sin(t * tl.tumbleSpeed * 10 + p) * tl.tumbleAmp * dt
            tl.mesh.rotation.z += Math.cos(t * tl.tumbleSpeed * 8 + p * 1.5) * tl.tumbleAmp * 0.5 * dt
          } else if (elapsed < HOLD_DURATION) {
            const orbitSpeed = 0.6
            const currentAngle = tl.slotAngle + t * orbitSpeed
            tl.mesh.position.set(
              ORIGIN.x + Math.cos(currentAngle) * ORBIT_RADIUS,
              ORIGIN.y + Math.sin(currentAngle) * ORBIT_RADIUS * ORBIT_RATIO,
              ORIGIN.z + Math.sin(currentAngle * 0.5) * 0.5
            )
            tl.mesh.rotateOnAxis(tl.axis, tl.rotSpeed * 3.5 * dt)
            tl.mesh.rotation.x += Math.sin(t * 2.0 + p) * 0.3 * dt
            tl.mesh.rotation.z += Math.cos(t * 1.6 + p * 1.5) * 0.2 * dt
            tl.mesh.scale.setScalar(tl.introScale)
            tl.mesh.traverse((child: any) => {
              if (child.isMesh && child.material) child.material.opacity = 1.0
            })
            tl._launchX = tl.mesh.position.x
            tl._launchY = tl.mesh.position.y
            tl._launchZ = tl.mesh.position.z
          } else {
            const burstElapsed = elapsed - HOLD_DURATION
            const lx = tl._launchX ?? ORIGIN.x
            const ly = tl._launchY ?? ORIGIN.y
            const lz = tl._launchZ ?? ORIGIN.z

            const posProgress = Math.min(1, burstElapsed / BURST_DURATION)
            const posEase = easeOutExpo(posProgress)
            const overshoot = 1.15
            const settleProgress = Math.min(1, Math.max(0, (burstElapsed - BURST_DURATION) / SETTLE_DURATION))
            const settleEase = easeOutCubic(settleProgress)
            const posMul = burstElapsed < BURST_DURATION ? posEase * overshoot : overshoot + (1.0 - overshoot) * settleEase

            const cx = lx + (tl.bx - lx) * posMul
            const cy = ly + (tl.by - ly) * posMul
            const cz = lz + (tl.bz - lz) * posMul

            const floatIn = easeOutCubic(Math.min(1, burstElapsed / TOTAL_EXPLODE))
            tl.mesh.position.x = cx + Math.sin(t * tl.fx + p) * tl.ax * floatIn + mx * 0.1 * floatIn
            tl.mesh.position.y = cy + Math.cos(t * tl.fy + p * 1.3) * tl.ay * floatIn + my * 0.06 * floatIn
            tl.mesh.position.z = cz + Math.sin(t * tl.fz + p * 0.7) * tl.az * floatIn

            const scaleDelay = 0.2
            const scaleElapsed = Math.max(0, burstElapsed - scaleDelay)
            const scaleProgress = Math.min(1, scaleElapsed / (TOTAL_EXPLODE - scaleDelay))
            const scaleEase = easeInOutQuad(scaleProgress)
            tl.mesh.scale.setScalar(tl.introScale + (tl.finalScale - tl.introScale) * scaleEase)

            const opacityProgress = Math.min(1, burstElapsed / (BURST_DURATION * 0.8))
            const opacityEase = easeOutExpo(opacityProgress)
            const currentOpacity = 1.0 + (0.38 - 1.0) * opacityEase
            tl.mesh.traverse((child: any) => {
              if (child.isMesh && child.material) child.material.opacity = currentOpacity
            })

            const spinDecay = 1 + (1 - floatIn) * 8
            tl.mesh.rotateOnAxis(tl.axis, tl.rotSpeed * spinDecay * dt)
            tl.mesh.rotation.x += Math.sin(t * tl.tumbleSpeed * 10 + p) * tl.tumbleAmp * dt
            tl.mesh.rotation.z += Math.cos(t * tl.tumbleSpeed * 8 + p * 1.5) * tl.tumbleAmp * 0.5 * dt
          }
        })

        R.render(scene, cam)
      }
      animId = requestAnimationFrame(loop)

      const onResize = () => {
        const r = heroEl.getBoundingClientRect()
        cam.aspect = r.width / r.height
        cam.updateProjectionMatrix()
        R.setSize(r.width, r.height)
      }
      window.addEventListener('resize', onResize)

      return () => {
        disposed = true
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        document.removeEventListener('mousemove', onMouseMove)
        visObs.disconnect()
        R.dispose()
      }
    })

    return () => { disposed = true }
  }, [isMobile, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={layerRef}
      className="parallax-layer absolute inset-0 pointer-events-none"
      data-speed="0.12"
      style={{ zIndex: 10, transition: 'z-index 0s' }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
