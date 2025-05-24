"use client";


import './Sma.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef, useEffect } from "react";


const Sekolah_Menengah_Atas = () => {
    return (
        <Container_Sma/>
    );
}


const Container_Sma = () => {
    
    const sliderRef = useRef(null);

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
    
      const fasilitassmaData = [
        {
          src: "/images/akademik/sma/fasilitas-sma/lapangan-dummy.webp",
          alt: "Lapangan Bermain",
          title: "Lapangan Bermain",
        },
        {
          src: "/images/akademik/sma/fasilitas-sma/kelas-dummy.webp",
          alt: "Kelas Interaktif",
          title: "Kelas Interaktif",
        },
        {
          src: "/images/akademik/sma/fasilitas-sma/perpustakaan-dummy.webp",
          alt: "Perpustakaan Mini",
          title: "Perpustakaan Mini",
        },
        {
          src: "/images/akademik/sma/fasilitas-sma/ruang-musik-dummy.webp",
          alt: "Ruang Musik",
          title: "Ruang Musik & Seni",
        },
        {
          src: "/images/akademik/sma/fasilitas-sma/laboratorium-dummy.webp",
          alt: "Lab Komputer Anak",
          title: "Lab Komputer Anak",
        },
    ];
    
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
                            <h2 className="title-deskripsi-sma">smaIT DARUR ROSYID</h2>
                            <p className="sub-title-akreditasi-sma">TERAKREDITASI B</p>
                        </div>
                        <div className="bottom-deskripsi-sma">
                            <p className="text-deskripsi-sma">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                            </p>
                        </div>
                    </div>
                    <div className="right-deskripsi-sma">
                        <div className="img-deskripsi-sma-wrapper">
                            <img
                            src="/images/akademik/sma/deskripsi-sma/sma.webp"
                            alt="deskripsi-sma"
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
                        <p className="text-visi-sma">
                            Menjadi lembaga pendidikan dasar yang unggul dalam membentuk karakter islami, cerdas, dan berwawasan global.
                        </p>
                        <div className="moto-sma-wrapper">
                            <h4 className="moto-sma-title">Moto</h4>
                            <p className="moto-sma-text">"Belajar dengan Iman, Tumbuh dengan Ilmu, Berkarya dengan Akhlak"</p>
                        </div>
                    </div>
                    <div className="visi-misi-sma-card">
                        <h3 className="title-visi-misi-sma">Misi</h3>
                        <ul className="misi-list-sma">
                            <li><span>✔</span> Menanamkan nilai-nilai keislaman sejak dini.</li>
                            <li><span>✔</span> Meningkatkan kompetensi akademik dan non-akademik siswa.</li>
                            <li><span>✔</span> Mendorong kreativitas dan keterampilan abad 21.</li>
                            <li><span>✔</span> Mewujudkan lingkungan belajar yang aman dan menyenangkan.</li>
                            <li><span>✔</span> Menjalin kerjasama antara sekolah, orang tua, dan masyarakat.</li>
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
                            {fasilitassmaData.map((item, index) => (
                            <div key={index} className="fasilitas-card-sma">
                                <img src={item.src} alt={item.alt} className="fasilitas-img-sma" />
                                <div className="fasilitas-overlay-sma">
                                <h3>{item.title}</h3>
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
