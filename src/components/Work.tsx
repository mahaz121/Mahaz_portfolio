import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Odoo ERP Deployment",
    category: "ERP Implementation & Administration",
    tools: "Odoo ERP, Ubuntu Server, AWS, DigitalOcean, PostgreSQL",
    highlights: [
      "Modules: CRM, Sales, Purchase, Inventory",
      "HR, Fleet Management, Accounting",
      "On-premise & Cloud deployment",
      "PostgreSQL backup & monitoring",
    ],
    icon: "⚙",
  },
  {
    title: "Cloud Infrastructure",
    category: "Cloud & Application Deployment",
    tools: "AWS, DigitalOcean, NGINX, Cloudflare, SSL, Amazon S3",
    highlights: [
      "EC2 server provisioning & hardening",
      "S3 automated backup strategies",
      "SSL certificates & CDN config",
      "DNS management via Cloudflare",
    ],
    icon: "☁",
  },
  {
    title: "Network Engineering",
    category: "Network Infrastructure & Security",
    tools: "VLAN, VPN, Firewall, NAT, DHCP, Static Routing, VoIP",
    highlights: [
      "VLAN segmentation & routing",
      "VPN setup & management",
      "Firewall rules & port forwarding",
      "SIP / VoIP configuration",
    ],
    icon: "⬡",
  },
  {
    title: "Security & Compliance",
    category: "System Hardening & Access Control",
    tools: "ARAMCO Standards, Active Directory, GPO, WSUS, Risk Assessment",
    highlights: [
      "ARAMCO baseline hardening",
      "Active Directory lifecycle mgmt",
      "GPO & WSUS administration",
      "Security risk assessments",
    ],
    icon: "◈",
  },
  {
    title: "Virtualization & Containers",
    category: "Virtualization & Containerization",
    tools: "VMware, Hyper-V, Docker, Kubernetes",
    highlights: [
      "VMware virtual machine management",
      "Hyper-V environment admin",
      "Docker containerized deployments",
      "Kubernetes fundamentals",
    ],
    icon: "▣",
  },
];

const WorkDisplay = ({
  highlights,
  icon,
  title,
}: {
  highlights: string[];
  icon: string;
  title: string;
}) => (
  <div className="work-display">
    <div className="work-display-header">
      <span className="work-display-icon">{icon}</span>
      <span className="work-display-label">{title}</span>
      <span className="work-display-status">
        <span className="work-display-dot" />
        ACTIVE
      </span>
    </div>
    <div className="work-display-body">
      {highlights.map((h, i) => (
        <div className="work-display-line" key={i}>
          <span className="work-display-arrow">›</span>
          <span>{h}</span>
        </div>
      ))}
    </div>
    <div className="work-display-footer">
      <span className="work-display-bar" />
    </div>
  </div>
);

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Stack</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkDisplay
                        highlights={project.highlights}
                        icon={project.icon}
                        title={project.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
