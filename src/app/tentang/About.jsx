"use client";
import './About.css'
import { useEffect, useState } from "react";

const About = () => {
    return (
        <Section_About/>
    );
}

const Section_About = () => {

    const [about, setAbout] = useState(null);
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchAbout = async () => {
        try {
        const res = await fetch("/api/about-info");
        const result = await res.json();

        setAbout(result.about);        // ambil isi about
        setMissions(result.missions);  // ambil array misi
        } catch (err) {
        console.error("Gagal mengambil data about_info", err);
        } finally {
        setLoading(false);
        }
    };

    fetchAbout();
    }, []);

    if (loading) return <p>Memuat data kontak...</p>;
    if (!about) return <p>Data kontak tidak tersedia</p>;

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
                            <img src={about.image1Url} alt="" />
                        </div>
                        <div className="about-right">
                            <div className="about-right-top">
                                <img src={about.image2Url} alt="" />
                            </div>
                            <div className="about-right-bottom">
                                <img src={about.image3Url} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-main">
                    <div className="about-main-left">
                        <img src={about.image4Url} alt="" />
                    </div>
                    <div className="about-main-right">
                        <div className="about-main-right-title">
                            <h3>{about.heading}</h3>
                        </div>
                        <div className="about-main-right-paragraph">
                            <p>{about.description}</p>
                            <h4>{about.leaderName}</h4>
                            <span>{about.leaderTitle}</span>
                        </div>
                    </div>
                </div>
                <div className="about-vision-mision">
                    <div className="about-vision">
                        <h3>Visi</h3>
                        <p>{about.vision}</p>
                    </div>
                    <div className="about-mision">
                        <h3>Misi</h3>
                        <ul>
                            {missions.map((misi) => (
                                <li key={misi.id}>{misi.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;