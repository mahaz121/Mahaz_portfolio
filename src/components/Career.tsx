import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>System Engineer – Infrastructure &amp; ERP Operations</h4>
                <h5>Designtech Engineering Consultants — Riyadh, Saudi Arabia</h5>
              </div>
              <h3>2022 – NOW</h3>
            </div>
            <p>
              Deployed and managed Odoo ERP environments on AWS and DigitalOcean.
              Configured VLANs, NAT, VPN, and firewall rules for secure network
              operations. Applied server hardening baselines aligned with ARAMCO
              compliance standards. Managed Active Directory, PostgreSQL backups,
              SSL certificates, and Cloudflare CDN configurations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IT Support Specialist</h4>
                <h5>Surprise Industrial Corporation — Bangladesh</h5>
              </div>
              <h3>2019 – 2021</h3>
            </div>
            <p>
              Provided Level 1 &amp; 2 technical support across infrastructure and
              server systems. Installed and maintained enterprise applications and
              servers. Monitored system performance and resolved incidents to
              minimize downtime. Assisted in deployment testing and operational
              improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
