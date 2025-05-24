"use client";


import './Smp.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef, useEffect } from "react";


const Sekolah_Menengah_Pertama = () => {
    return (
        <Container_Smp/>
    );
}


const Container_Smp = () => {
    
    const sliderRef = useRef(null);

    const scrollByCard = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector(".fasilitas-card-smp");
        if (!card) return;

        const scrollAmount = card.offsetWidth + 24;
        slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
    
        let ismpown = false;
        let startX;
        let scrollLeftStart;
    
        const handleMouseDown = (e) => {
          ismpown = true;
          slider.classList.add("active");
          startX = e.pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
    
        const handleMouseMove = (e) => {
          if (!ismpown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
    
        const handleMouseUp = () => (ismpown = false);
        const handleMouseLeave = () => (ismpown = false);
        const handleTouchStart = (e) => {
          ismpown = true;
          startX = e.touches[0].pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
        const handleTouchMove = (e) => {
          if (!ismpown) return;
          const x = e.touches[0].pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
        const handleTouchEnd = () => (ismpown = false);
    
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
    
      const fasilitassmpData = [
        {
          src: "/images/akademik/smp/fasilitas-smp/lapangan-dummy.webp",
          alt: "Lapangan Bermain",
          title: "Lapangan Bermain",
        },
        {
          src: "/images/akademik/smp/fasilitas-smp/kelas-dummy.webp",
          alt: "Kelas Interaktif",
          title: "Kelas Interaktif",
        },
        {
          src: "/images/akademik/smp/fasilitas-smp/perpustakaan-dummy.webp",
          alt: "Perpustakaan Mini",
          title: "Perpustakaan Mini",
        },
        {
          src: "/images/akademik/smp/fasilitas-smp/ruang-musik-dummy.webp",
          alt: "Ruang Musik",
          title: "Ruang Musik & Seni",
        },
        {
          src: "/images/akademik/smp/fasilitas-smp/laboratorium-dummy.webp",
          alt: "Lab Komputer Anak",
          title: "Lab Komputer Anak",
        },
    ];
    
    return (
        <>
            {/* Header-smp */}        
            <div className="container-header-smp">
                <div className="section-header-smp">
                    <div className="header-smp">
                        <p className="sub-title-smp">Sekolah Menengah Pertama Islam Terpadu</p>
                        <h2 className="title-smp">Darur Rosyid</h2>
                    </div>
                </div>
            </div>

            {/* Deskripsi Sekolah */}
            <div className="container-deskripsi-smp">
                <div className="section-deskripsi-smp">
                    <div className="left-deskripsi-smp">
                        <div className="top-head-deskripsi-smp">
                            <p className="sub-title-deskripsi-smp">Selamat Datang di</p>
                            <h2 className="title-deskripsi-smp">SMPIT DARUR ROSYID</h2>
                            <p className="sub-title-akreditasi-smp">TERAKREDITASI B</p>
                        </div>
                        <div className="bottom-deskripsi-smp">
                            <p className="text-deskripsi-smp">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                            </p>
                        </div>
                    </div>
                    <div className="right-deskripsi-smp">
                        <div className="img-deskripsi-smp-wrapper">
                            <img
                            src="/images/akademik/smp/deskripsi-smp/smp.webp"
                            alt="deskripsi-smp"
                            className="img-deskripsi-smp"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi */}
            <div className="container-visi-misi-smp">
                <div className="section-visi-misi-smp">
                    <div className="visi-misi-smp-card">
                        <h3 className="title-visi-misi-smp">Visi</h3>
                        <p className="text-visi-smp">
                            Menjadi lembaga pendidikan dasar yang unggul dalam membentuk karakter islami, cerdas, dan berwawasan global.
                        </p>
                        <div className="moto-smp-wrapper">
                            <h4 className="moto-smp-title">Moto</h4>
                            <p className="moto-smp-text">"Belajar dengan Iman, Tumbuh dengan Ilmu, Berkarya dengan Akhlak"</p>
                        </div>
                    </div>
                    <div className="visi-misi-smp-card">
                        <h3 className="title-visi-misi-smp">Misi</h3>
                        <ul className="misi-list-smp">
                            <li><span>✔</span> Menanamkan nilai-nilai keislaman sejak dini.</li>
                            <li><span>✔</span> Meningkatkan kompetensi akademik dan non-akademik siswa.</li>
                            <li><span>✔</span> Mendorong kreativitas dan keterampilan abad 21.</li>
                            <li><span>✔</span> Mewujudkan lingkungan belajar yang aman dan menyenangkan.</li>
                            <li><span>✔</span> Menjalin kerjasama antara sekolah, orang tua, dan masyarakat.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Fasilitas smp */}
            <div className="container-fasilitas-smp">
                <div className="section-fasilitas-smp">
                    <div className="head-fasilitas-smp">
                        <h2 className="tittle-fasilitas-smp">Fasilitas Sekolah</h2>
                    </div>

                    <div className="slider-fasilitas-wrapper-smp">
                        <button className="slider-fasilitas-smp-button left" onClick={() => scrollByCard(-1)}>
                            <FaAngleLeft />
                        </button>

                        <div className="card-fasilitas-wrapper-smp" ref={sliderRef}>
                            {fasilitassmpData.map((item, index) => (
                            <div key={index} className="fasilitas-card-smp">
                                <img src={item.src} alt={item.alt} className="fasilitas-img-smp" />
                                <div className="fasilitas-overlay-smp">
                                <h3>{item.title}</h3>
                                </div>
                            </div>
                            ))}
                        </div>

                        <button className="slider-fasilitas-smp-button right" onClick={() => scrollByCard(1)}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>







        
        
        </>
    );
}

export default Sekolah_Menengah_Pertama;
