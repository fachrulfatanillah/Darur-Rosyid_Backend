"use client";


import './Sma.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";


const Sekolah_Menengah_Atas = () => {
    return (
        <Container_Sma/>
    );
}


const Container_Sma = () => {
    
    const sliderRef = useRef(null);
    const [dataAcademicSma, setDataAcademicSma] = useState(null);
    const [dataActivitiesSma, setDataActivitiesSma] = useState([]);
    const [dataMissionsSma, setDataMissionsSma] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch API academic-info-sd
    useEffect(() => {
    const fetchAcademicInfo = async () => {
        try {
        const res = await fetch("/api/academic/sma");
        const result = await res.json();

        setDataAcademicSma(result.academicInfo);
        setDataActivitiesSma(result.activities);
        setDataMissionsSma(result.missions);
        } catch (error) {
        console.error("Gagal mengambil data academic_info_sd", error);
        } finally {
        setLoading(false);
        }
    };

    fetchAcademicInfo();
    }, []);

    const scrollByCard = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector(".fasilitas-card-sma");
        if (!card) return;

        const scrollAmount = card.offsetWidth + 24;
        slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
    
        let ismaown = false;
        let startX;
        let scrollLeftStart;
    
        const handleMouseDown = (e) => {
          ismaown = true;
          slider.classList.add("active");
          startX = e.pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
    
        const handleMouseMove = (e) => {
          if (!ismaown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
    
        const handleMouseUp = () => (ismaown = false);
        const handleMouseLeave = () => (ismaown = false);
        const handleTouchStart = (e) => {
          ismaown = true;
          startX = e.touches[0].pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
        const handleTouchMove = (e) => {
          if (!ismaown) return;
          const x = e.touches[0].pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
        const handleTouchEnd = () => (ismaown = false);
    
        slider.addEventListener("mousedown", handleMouseDown);
        slider.addEventListener("mousemove", handleMouseMove);
        slider.addEventListener("mouseup", handleMouseUp);
        slider.addEventListener("mouseleave", handleMouseLeave);
        slider.addEventListener("touchstart", handleTouchStart);
        slider.addEventListener("touchmove", handleTouchMove);
        slider.addEventListener("touchend", handleTouchEnd);
    
        return () => {
          slider.removeEventListener("mousedown", handleMouseDown);
          slider.removeEventListener("mousemove", handleMouseMove);
          slider.removeEventListener("mouseup", handleMouseUp);
          slider.removeEventListener("mouseleave", handleMouseLeave);
          slider.removeEventListener("touchstart", handleTouchStart);
          slider.removeEventListener("touchmove", handleTouchMove);
          slider.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    if (loading) return <p>Memuat data SMP...</p>;
    if (!dataAcademicSma) return <p>Data SMP tidak tersedia.</p>;
    
    return (
        <>
            {/* Header-sma */}        
            <div className="container-header-sma">
                <div className="section-header-sma">
                    <div className="header-sma">
                        <p className="sub-title-sma">Sekolah Menengah Atas Islam Terpadu</p>
                        <h2 className="title-sma">Darur Rosyid</h2>
                    </div>
                </div>
            </div>

            {/* Deskripsi Sekolah */}
            <div className="container-deskripsi-sma">
                <div className="section-deskripsi-sma">
                    <div className="left-deskripsi-sma">
                        <div className="top-head-deskripsi-sma">
                            <p className="sub-title-deskripsi-sma">Selamat Datang di</p>
                            <h2 className="title-deskripsi-sma">{dataAcademicSma.title}</h2>
                            <p className="sub-title-akreditasi-sma">{dataAcademicSma.subTitle}</p>
                        </div>
                        <div className="bottom-deskripsi-sma">
                            <p className="text-deskripsi-sma">{dataAcademicSma.paragraph}</p>
                        </div>
                    </div>
                    <div className="right-deskripsi-sma">
                        <div className="img-deskripsi-sma-wrapper">
                            <img
                            src={dataAcademicSma.imageUrl}
                            alt={dataAcademicSma.title}
                            className="img-deskripsi-sma"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi */}
            <div className="container-visi-misi-sma">
                <div className="section-visi-misi-sma">
                    <div className="visi-misi-sma-card">
                        <h3 className="title-visi-misi-sma">Visi</h3>
                        <p className="text-visi-sma">{dataAcademicSma.vision}</p>
                        <div className="moto-sma-wrapper">
                            <h4 className="moto-sma-title">Moto</h4>
                            <p className="moto-sma-text">{dataAcademicSma.moto}</p>
                        </div>
                    </div>
                    <div className="visi-misi-sma-card">
                        <h3 className="title-visi-misi-sma">Misi</h3>
                        <ul className="misi-list-sma">
                            {dataMissionsSma.map((mission) => (
                                <li key={mission.id}><span>✔</span>{mission.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Fasilitas sma */}
            <div className="container-fasilitas-sma">
                <div className="section-fasilitas-sma">
                    <div className="head-fasilitas-sma">
                        <h2 className="tittle-fasilitas-sma">Fasilitas Sekolah</h2>
                    </div>

                    <div className="slider-fasilitas-wrapper-sma">
                        <button className="slider-fasilitas-sma-button left" onClick={() => scrollByCard(-1)}>
                            <FaAngleLeft />
                        </button>

                        <div className="card-fasilitas-wrapper-sma" ref={sliderRef}>
                            {dataActivitiesSma.map((activity) => (
                            <div key={activity.id} className="fasilitas-card-sma">
                                <img src={activity.imageUrl} alt={activity.title} className="fasilitas-img-sma" />
                                <div className="fasilitas-overlay-sma">
                                <h3>{activity.title}</h3>
                                </div>
                            </div>
                            ))}
                        </div>

                        <button className="slider-fasilitas-sma-button right" onClick={() => scrollByCard(1)}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>







        
        
        </>
    );
}

export default Sekolah_Menengah_Atas;
