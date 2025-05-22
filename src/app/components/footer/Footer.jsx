import './Footer.css'

const Footer = () => {
    return (
        <Section_Footer/>
    );
}

const Section_Footer = () => {
    return (
        <section className="section-footer">
            <div className="footer-container center">
                <p className="footer-copyright">
                    © {new Date().getFullYear()}{' '}
                    <a
                        href="https://projectsinc.web.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        Projectsinc
                    </a>. All rights reserved.
                </p>
            </div>
        </section>
    );
}

export default Footer;