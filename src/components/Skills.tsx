import "./styles/Skills.css";

const skillCategories = [
  {
    title: "Operating Systems",
    icon: "OS",
    items: [
      { name: "Ubuntu Server", detail: "Primary production environment, daily administration" },
      { name: "RHEL", detail: "Enterprise server management, working knowledge" },
      { name: "CentOS", detail: "Server deployment and configuration" },
      { name: "Windows Server", detail: "Active Directory, GPO, WSUS management" },
      { name: "Kali Linux", detail: "Security auditing and penetration testing basics" },
    ],
  },
  {
    title: "ERP Systems",
    icon: "ERP",
    items: [
      { name: "Odoo ERP", detail: "Full implementation, administration & integration" },
      { name: "CRM & Sales", detail: "Module configuration and workflow setup" },
      { name: "Inventory & Purchase", detail: "Stock management and procurement" },
      { name: "Accounting & HR", detail: "Financial modules and HR administration" },
      { name: "Fleet Management", detail: "Vehicle tracking and maintenance" },
    ],
  },
  {
    title: "Databases",
    icon: "DB",
    items: [
      { name: "PostgreSQL", detail: "Backup strategies, restoration and monitoring" },
      { name: "Performance Tuning", detail: "Query optimization and resource management" },
      { name: "Backup Automation", detail: "Scheduled backups to S3-compatible storage" },
    ],
  },
  {
    title: "Networking",
    icon: "NET",
    items: [
      { name: "NGINX", detail: "Reverse proxy and web server configuration" },
      { name: "VLAN & NAT", detail: "Network segmentation and address translation" },
      { name: "DHCP & VPN", detail: "Address management and secure tunnels" },
      { name: "Firewalls & Routing", detail: "Static routing and internal routing policies" },
      { name: "VoIP / SIP", detail: "SIP extension management and VoIP configuration" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: "CLD",
    items: [
      { name: "Amazon Web Services", detail: "EC2, S3, cloud server provisioning" },
      { name: "DigitalOcean", detail: "Droplet management and deployment" },
      { name: "Cloudflare", detail: "DNS, SSL certificates, CDN configuration" },
      { name: "Amazon S3", detail: "Automated backup and storage strategies" },
    ],
  },
  {
    title: "Virtualization & Containers",
    icon: "VIRT",
    items: [
      { name: "VMware", detail: "Virtual machine management and provisioning" },
      { name: "Hyper-V", detail: "Virtual environment administration" },
      { name: "Docker", detail: "Containerized application deployment" },
      { name: "Kubernetes", detail: "Fundamentals and basic deployment" },
    ],
  },
  {
    title: "Scripting & Automation",
    icon: "SCR",
    items: [
      { name: "Bash Scripting", detail: "System automation, scheduled tasks, maintenance" },
      { name: "Python", detail: "Scripting and task automation" },
    ],
  },
  {
    title: "Monitoring & Logging",
    icon: "MON",
    items: [
      { name: "Zabbix", detail: "Infrastructure monitoring and alerting" },
      { name: "Grafana", detail: "Dashboard creation and metrics visualization" },
      { name: "System Logs", detail: "Log analysis and troubleshooting" },
      { name: "SNMP", detail: "Network device monitoring and traps" },
    ],
  },
  {
    title: "Security & Compliance",
    icon: "SEC",
    items: [
      { name: "ARAMCO Standards", detail: "Server hardening aligned with compliance baselines" },
      { name: "Active Directory", detail: "Lifecycle management: provisioning, GPO, WSUS" },
      { name: "Access Control", detail: "Policy implementation and enforcement" },
      { name: "Risk Assessments", detail: "Security audits and vulnerability analysis" },
      { name: "Cyber Security", detail: "Cisco Networking Academy certified" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="skills-section section-container" id="skills">
      <h2 className="skills-heading">
        Technical <span>Skills</span>
      </h2>
      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div className="skill-card" key={cat.title}>
            <div className="skill-card-header">
              <span className="skill-card-icon">{cat.icon}</span>
              <h3>{cat.title}</h3>
            </div>
            <div className="skill-card-body">
              {cat.items.map((item) => (
                <div className="skill-item" key={item.name}>
                  <span className="skill-name">{item.name}</span>
                  <span className="skill-detail">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
