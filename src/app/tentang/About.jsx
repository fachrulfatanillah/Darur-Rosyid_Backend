import './About.css'

const About = () => {
    return (
        <Section_About/>
    );
}

const Section_About = () => {
    return (
        <section className='section-about'>
            <div className="container-about">
                <div className="about-title-header">
                        <h3>Tentang</h3>
                        <h2>Darur Rosyid</h2>
                    </div>
                <div className="about-header">
                    <div className="about-header">
                        <div className="about-left">
                            <img src="https://suba-arch.com/wp-content/uploads/2021/06/Lumion-10-Pro-%E6%AD%A3%E7%89%88%E6%8E%88%E6%9D%83_12-Photo.jpg" alt="" />
                        </div>
                        <div className="about-right">
                            <div className="about-right-top">
                                <img src="https://www.multidesainarsitek.com/wp-content/uploads/2022/09/REAL-TAMPAK-MI-MAMBAUL-HUDA-2.jpg" alt="" />
                            </div>
                            <div className="about-right-bottom">
                                <img src="https://www.multidesainarsitek.com/wp-content/uploads/2022/09/GEDUNG-KELAS-PONDOK-PESANTREN-1-1038x576.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-main">
                    <div className="about-main-left">
                        <img src="https://cdnpro.eraspace.com/media/mageplaza/blog/post/p/o/positive-confident-young-caucasian-male-office-worker-wearing-white-formal-shirt-classic-trousers-with-belt-having-happy-facial-expression-keeping-hands-pockets-smiling-joyfully_343059-4600.jpg" alt="" />
                    </div>
                    <div className="about-main-right">
                        <div className="about-main-right-title">
                            <h3>Selamat Datang di Official Website Darur Rosyid</h3>
                        </div>
                        <div className="about-main-right-paragraph">
                            <p>Pondok Pesantren Darur Rosyid merupakan lembaga pendidikan Islam yang berkomitmen membentuk generasi muda yang berakhlak mulia, berilmu, dan bertakwa. Dengan menggabungkan kurikulum pendidikan formal dan pendidikan pesantren, Darur Rosyid membina santri untuk memiliki kecakapan intelektual sekaligus spiritual. Para santri tidak hanya dibekali dengan ilmu agama seperti tahfidzul Qur’an, fiqih, dan aqidah, tetapi juga diajarkan ilmu pengetahuan umum untuk mempersiapkan mereka menghadapi tantangan zaman. Dengan lingkungan yang kondusif, disiplin, serta didukung oleh tenaga pengajar yang kompeten, pesantren ini menjadi tempat yang ideal untuk menumbuhkan karakter dan potensi generasi penerus bangsa.</p>
                            <h4>Lorem Ipsum</h4>
                            <span>Pimpinan Yayasan</span>
                        </div>
                    </div>
                </div>
                <div className="about-vision-mision">
                    <div className="about-vision">
                        <h3>Visi</h3>
                        <p>Menjadi lembaga pendidikan Islam yang unggul dalam membentuk generasi berakhlak, berilmu, dan bertakwa.</p>
                    </div>
                    <div className="about-mision">
                        <h3>Misi</h3>
                        <ul>
                            <li>Mendidik santri dengan ilmu agama dan umum.</li>
                            <li>Menanamkan nilai-nilai moral dan spiritual.</li>
                            <li>Mengembangkan potensi dan karakter santri.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;