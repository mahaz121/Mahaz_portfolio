import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

const skills = [
  "Linux\nUbuntu",
  "Odoo ERP",
  "Python",
  "Bash\nScript",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "NGINX",
  "VMware",
  "Cloudflare",
  "AWS",
  "Networking",
  "VPN /\nFirewall",
  "Active\nDir.",
  "Security",
];

function createSkillTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#060d18";
  ctx.fillRect(0, 0, 256, 256);

  ctx.shadowBlur = 18;
  ctx.shadowColor = "#14b8a6";
  ctx.strokeStyle = "#14b8a6";
  ctx.lineWidth = 7;
  ctx.strokeRect(5, 5, 246, 246);
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(20,184,166,0.25)";
  ctx.lineWidth = 2;
  ctx.strokeRect(14, 14, 228, 228);

  const lines = text.split("\n");
  const fontSize = lines.some((l) => l.length > 8) ? 28 : lines[0].length > 6 ? 30 : 36;
  ctx.font = `bold ${fontSize}px 'Arial', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#5eead4";

  const lineHeight = fontSize + 10;
  const totalH = lines.length * lineHeight;
  const startY = 128 - totalH / 2 + lineHeight / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, 128, startY + i * lineHeight);
  });

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const spheres = [...Array(15)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workEl = document.getElementById("work");
      if (!workEl) return;
      const threshold = workEl.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return skills.map((skill) => {
      const tex = createSkillTexture(skill);
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        emissive: "#0d4a42",
        emissiveMap: tex,
        emissiveIntensity: 0.4,
        metalness: 0.3,
        roughness: 0.8,
        clearcoat: 0.15,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2>Technologies</h2>
      <Canvas
        gl={{ alpha: true, stencil: false, depth: false, antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
      </Canvas>
    </div>
  );
};

export default TechStack;
