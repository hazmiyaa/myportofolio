import * as THREE from "three"

type Frame = (seconds: number, delta: number) => void

// Only render the visible stage. Artwork and links remain available without a GPU.
function stage(canvas: HTMLCanvasElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera, animate: Frame) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" })
  renderer.setClearColor(0, 0)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6))
  const preference = matchMedia("(prefers-reduced-motion: reduce)")
  let visible = false
  let frame = 0
  let previous = 0
  let seconds = 0
  let stopped = false
  function render(now: number) {
    frame = 0
    if (stopped || !visible || document.hidden) return
    if (now - previous >= 32 || preference.matches) {
      const elapsed = Math.min((now - previous) / 1000, .08)
      previous = now
      if (!preference.matches) seconds += elapsed
      animate(seconds, preference.matches ? 1 : elapsed)
      renderer.render(scene, camera)
    }
    if (!preference.matches) redraw()
  }
  function redraw() {
    if (!stopped && visible && !document.hidden && !frame) frame = requestAnimationFrame(render)
  }
  function resize() {
    const width = canvas.clientWidth, height = canvas.clientHeight
    if (!width || !height) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    redraw()
  }
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; redraw() })
  const size = new ResizeObserver(resize)
  visibility.observe(canvas)
  size.observe(canvas)
  preference.addEventListener("change", redraw)
  document.addEventListener("visibilitychange", redraw)
  resize()
  return {
    redraw,
    dispose() {
      stopped = true
      cancelAnimationFrame(frame)
      visibility.disconnect()
      size.disconnect()
      preference.removeEventListener("change", redraw)
      document.removeEventListener("visibilitychange", redraw)
      const geometries = new Set<THREE.BufferGeometry>()
      const materials = new Set<THREE.Material>()
      scene.traverse(obj => {
        const mesh = obj as THREE.Mesh
        if (!mesh.geometry) return
        geometries.add(mesh.geometry)
        for (const mat of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) materials.add(mat)
      })
      geometries.forEach(g => g.dispose())
      materials.forEach(m => m.dispose())
      renderer.dispose()
    },
  }
}

export function startStudio(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(47, 1, .1, 30)
  camera.position.z = 6
  const positions = new Float32Array(95 * 3)
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = Math.random() * 23 - 11.5
    positions[i + 1] = Math.random() * 9 - 4.5
    positions[i + 2] = Math.random() * 8 - 5
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const dust = new THREE.Points(geo, new THREE.PointsMaterial({ size: .013, color: 0xbdedff, transparent: true, opacity: .58, depthWrite: false }))
  scene.add(dust)
  const hero = canvas.parentElement!
  let targetX = 0, targetY = 0
  function move(e: PointerEvent) {
    const rect = hero.getBoundingClientRect()
    targetX = (e.clientX - rect.left) / rect.width - .5
    targetY = (e.clientY - rect.top) / rect.height - .5
  }
  function reset() { targetX = 0; targetY = 0 }
  const view = stage(canvas, scene, camera, (time,delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX * .5, 4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -targetY * .3, 4, delta)
    dust.rotation.z = Math.sin(time * .08) * .05
    dust.position.y = Math.sin(time * .12) * .38
    hero.style.setProperty("--look-x", `${camera.position.x * 23}px`)
    hero.style.setProperty("--look-y", `${camera.position.y * 18}px`)
  })
  hero.addEventListener("pointermove", move)
  hero.addEventListener("pointerleave", reset)
  return () => {
    hero.removeEventListener("pointermove",move)
    hero.removeEventListener("pointerleave",reset)
    hero.style.removeProperty("--look-x")
    hero.style.removeProperty("--look-y")
    view.dispose()
  }
}

export function startDeck(canvas: HTMLCanvasElement, images: string[], mode: "video" | "game", ready: () => void) {
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x101c2a, 10, 17)
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 30)
  camera.position.set(0, .16, 6.35)
  camera.lookAt(0, -.06, 0)
  scene.add(new THREE.HemisphereLight(0xe1f6ff, 0x253347, 2.4))
  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(-2, 5, 4)
  scene.add(key)
  const accent = mode === "game" ? 0x73e1ff : 0xff9d5c
  const caseDepth = mode === "game" ? .22 : .045
  const caseHeight = mode === "game" ? 2.18 : 2.4
  const frameMaterial = new THREE.MeshStandardMaterial({ color: mode === "game" ? 0x284358 : 0x161c24, metalness: .65, roughness: .36 })
  const trim = new THREE.MeshBasicMaterial({ color: accent })
  const caseShape = new THREE.BoxGeometry(3.72, caseHeight, caseDepth)
  const artwork = new THREE.PlaneGeometry(3.54, 1.99)
  const sprocket = new THREE.PlaneGeometry(.115, .057)
  const ink = new THREE.MeshBasicMaterial({ color: 0x8d9dac })
  const strip = new THREE.BoxGeometry(.047, caseHeight * .89, .028)
  let disposed = false
  const loader = new THREE.TextureLoader()
  const textures: THREE.Texture[] = []
  let destination = 0, position = 0
  const objects: THREE.Group[] = []
  const view = stage(canvas, scene, camera, (seconds,delta) => {
    position = THREE.MathUtils.damp(position, destination, 8, delta)
    objects.forEach((group,index) => {
      const angle = (index-position) * Math.PI * 2 / images.length
      group.position.set(Math.sin(angle)*3.35, Math.cos(angle)*.04 + Math.sin(seconds*.7)*.025, (Math.cos(angle)-1)*2.45)
      group.rotation.set(-.045, -Math.sin(angle)*.69, Math.sin(angle)*.055)
    })
  })
  images.forEach((image, index) => {
    const group = new THREE.Group()
    group.add(new THREE.Mesh(caseShape, frameMaterial))
    const display = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })
    const texture = loader.load(image, loaded => {
      if (disposed) return
      const aspect = loaded.image.width / loaded.image.height
      const width = Math.min(1, (16 / 9) / aspect), height = Math.min(1, aspect / (16 / 9))
      loaded.repeat.set(width,height)
      loaded.offset.set((1-width)/2,(1-height)/2)
      display.map = loaded
      display.needsUpdate = true
      if (index === 0) ready()
      view.redraw()
    })
    texture.colorSpace = THREE.SRGBColorSpace
    textures.push(texture)
    const face = new THREE.Mesh(artwork, display)
    face.position.z = caseDepth / 2 + .004
    group.add(face)
    if (mode === "video") {
      const holes = new THREE.InstancedMesh(sprocket, ink, 26)
      const matrix = new THREE.Matrix4()
      for (let i = 0; i < 26; i++) {
        holes.setMatrixAt(i, matrix.makeTranslation(-1.58 + (i % 13)*.264, i < 13 ? 1.095 : -1.095, .032))
      }
      group.add(holes)
    } else {
      const spine = new THREE.Mesh(strip, trim)
      spine.position.set(-1.81,0,caseDepth/2)
      group.add(spine)
    }
    scene.add(group)
    objects.push(group)
  })
  const grid = new THREE.GridHelper(24, 36, accent, 0x47637a)
  grid.material.transparent = true
  grid.material.opacity = .22
  grid.position.y = -1.45
  scene.add(grid)
  const raycaster = new THREE.Raycaster()
  return {
    select(index: number) {
      const n = objects.length
      const current = ((destination % n) + n) % n
      let offset = index - current
      if (offset > n/2) offset -= n
      if (offset < -n/2) offset += n
      destination += offset
      view.redraw()
    },
    pick(x: number,y: number) {
      const rect = canvas.getBoundingClientRect()
      raycaster.setFromCamera(new THREE.Vector2((x-rect.left)/rect.width*2-1, 1-(y-rect.top)/rect.height*2),camera)
      const hit = raycaster.intersectObjects(objects,true)[0]
      return hit ? objects.indexOf(hit.object.parent as THREE.Group) : -1
    },
    dispose() { disposed = true; view.dispose(); textures.forEach(t=>t.dispose()) },
  }
}
