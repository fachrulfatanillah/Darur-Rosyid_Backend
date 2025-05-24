"use client";


import './Sd.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";


const Sekolah_Dasar = () => {
    return (
        <Container_Sd/>
    );
}


const Container_Sd = () => {

    const sliderRef = useRef(null);
    const [dataAcademicSd, setDataAcademicSd] = useState(null);
    const [dataActivitiesSd, setDataActivitiesSd] = useState([]);
    const [dataMissionsSd, setDataMissionsSd] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch API academic-info-sd
    useEffect(() => {
    const fetchAcademicInfo = async () => {
        try {
        const res = await fetch("/api/academic/sd");
        const result = await res.json();

        setDataAcademicSd(result.academicInfo);
        setDataActivitiesSd(result.activities);
        setDataMissionsSd(result.missions);
        } catch (error) {
        console.error("Gagal mengambil data academic_info_sd", error);
        } finally {
        setLoading(false);
        }
    };

    fetchAcademicInfo();
    }, []);

    // Slider drag/scroll handler
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let isDown = false;
        let startX = 0;
        let scrollLeftStart = 0;

        const handleMouseDown = (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeftStart = slider.scrollLeft;
        };

        const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollLeftStart - walk;
        };

        const endDrag = () => {
        isDown = false;
        slider.classList.remove("active");
        };

        const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeftStart = slider.scrollLeft;
        };

        const handleTouchMove = (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollLeftStart - walk;
        };

        // Event binding
        slider.addEventListener("mousedown", handleMouseDown);
        slider.addEventListener("mousemove", handleMouseMove);
        slider.addEventListener("mouseup", endDrag);
        slider.addEventListener("mouseleave", endDrag);
        slider.addEventListener("touchstart", handleTouchStart);
        slider.addEventListener("touchmove", handleTouchMove);
        slider.addEventListener("touchend", endDrag);

        // Cleanup
        return () => {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mousemove", handleMouseMove);
        slider.removeEventListener("mouseup", endDrag);
        slider.removeEventListener("mouseleave", endDrag);
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", endDrag);
        };
    }, []);

    // Scroll by button
    const scrollByCard = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector(".fasilitas-card-sd");
        if (!card) return;

        const scrollAmount = card.offsetWidth + 24;
        slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };

    // Render logic
    if (loading) return <p>Memuat data akademik SD...</p>;
    if (!dataAcademicSd) return <p>Data akademik SD tidak tersedia</p>;
    
    return (
        <>
            {/* Header-sd */}        
            <div className="container-header-sd">
                <div className="section-header-sd">
                    <div className="header-sd">
                        <p className="sub-title-sd">Sekolah Dasar Islam Terpadu</p>
                        <h2 className="title-sd">Darur Rosyid</h2>
                    </div>
                </div>
            </div>

            {/* Deskripsi Sekolah */}
            <div className="container-deskripsi-sd">
                <div className="section-deskripsi-sd">
                    <div className="left-deskripsi-sd">
                        <div className="top-head-deskripsi-sd">
                            <p className="sub-title-deskripsi-sd">Selamat Datang di</p>
                            <h2 className="title-deskripsi-sd">{dataAcademicSd.title}</h2>
                            <p className="sub-title-akreditasi-sd">{dataAcademicSd.subTitle}</p>
                        </div>
                        <div className="bottom-deskripsi-sd">
                            <p className="text-deskripsi-sd">
                                {dataAcademicSd.paragraph}
                            </p>
                        </div>
                    </div>
                    <div className="right-deskripsi-sd">
                        <div className="img-deskripsi-sd-wrapper">
                            <img
                            src={dataAcademicSd.imageUrl}
                            alt={dataAcademicSd.title}
                            className="img-deskripsi-sd"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi */}
            <div className="container-visi-misi-sd">
                <div className="section-visi-misi-sd">
                    <div className="visi-misi-sd-card">
                        <h3 className="title-visi-misi-sd">Visi</h3>
                        <p className="text-visi-sd">{dataAcademicSd.vision}</p>
                        <div className="moto-sd-wrapper">
                            <h4 className="moto-sd-title">Moto</h4>
                            <p className="moto-sd-text">{dataAcademicSd.moto}</p>
                        </div>
                    </div>
                    <div className="visi-misi-sd-card">
                        <h3 className="title-visi-misi-sd">Misi</h3>
                        <ul className="misi-list-sd">
                            {dataMissionsSd.map((mission) => (
                                <li key={mission.id}><span>✔</span>{mission.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Fasilitas SD */}
            <div className="container-fasilitas-sd">
                <div className="section-fasilitas-sd">
                    <div className="head-fasilitas-sd">
                        <h2 className="tittle-fasilitas-sd">Fasilitas Sekolah</h2>
                    </div>

                    <div className="slider-fasilitas-wrapper-sd">
                        <button className="slider-fasilitas-sd-button left" onClick={() => scrollByCard(-1)}>
                            <FaAngleLeft />
                        </button>

                        <div className="card-fasilitas-wrapper-sd" ref={sliderRef}>
                            {dataActivitiesSd.map((activity) => (
                            <div key={activity.id} className="fasilitas-card-sd">
                                <img src={activity.imageUrl} alt={activity.title} className="fasilitas-img-sd" />
                                <div className="fasilitas-overlay-sd">
                                <h3>{activity.title}</h3>
                                </div>
                            </div>
                            ))}
                        </div>

                        <button className="slider-fasilitas-sd-button right" onClick={() => scrollByCard(1)}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>







        
        
        </>
    );
}

export default Sekolah_Dasar;
