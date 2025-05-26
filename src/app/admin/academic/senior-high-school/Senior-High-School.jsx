"use client";


import './Senior-High-School.css'
import { FaAngleRight, FaAngleLeft, FaEdit } from "react-icons/fa";
import { useRef, useEffect } from "react";


const Senior_High_School = () => {
    return (
        <Container_Shs/>
    );
}


const Container_Shs = () => {
    
    const sliderRef = useRef(null);

    const scrollByCard = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector(".fasilitas-card-shs");
        if (!card) return;

        const scrollAmount = card.offsetWidth + 24;
        slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
    
        let ishsown = false;
        let startX;
        let scrollLeftStart;
    
        const handleMouseDown = (e) => {
          ishsown = true;
          slider.classList.add("active");
          startX = e.pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
    
        const handleMouseMove = (e) => {
          if (!ishsown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
    
        const handleMouseUp = () => (ishsown = false);
        const handleMouseLeave = () => (ishsown = false);
        const handleTouchStart = (e) => {
          ishsown = true;
          startX = e.touches[0].pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
        const handleTouchMove = (e) => {
          if (!ishsown) return;
          const x = e.touches[0].pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
        const handleTouchEnd = () => (ishsown = false);
    
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
    
      const fasilitasshsmaata = [
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
            {/* Header-shs */}        
            <div className="container-header-shs">
                <button className="edit-button-header-shs">
                    Edit <FaEdit className="icon-edit-header-shs" />
                </button>

                <div className="section-header-shs">
                    <div className="header-shs">
                        <p className="sub-title-shs">Sekolah Menegah Atas Islam Terpadu</p>
                        <h2 className="title-shs">Darur Rosyid</h2>
                    </div>
                </div>
            </div>


            {/* Deskripsi Sekolah */}
            <div className="container-deskripsi-shs">
                <button className="edit-button-deskripsi-shs">
                    Edit <FaEdit className="icon-edit-deskripsi-shs" />
                </button>

                <div className="section-deskripsi-shs">
                    <div className="left-deskripsi-shs">
                        <div className="top-head-deskripsi-shs">
                            <p className="sub-title-deskripsi-shs">Selamat Datang di</p>
                            <h2 className="title-deskripsi-shs">smaIT DARUR ROSYID</h2>
                            <p className="sub-title-akreditasi-shs">TERAKREDITASI B</p>
                        </div>
                        <div className="bottom-deskripsi-shs">
                            <p className="text-deskripsi-shs">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                            </p>
                        </div>
                    </div>
                    <div className="right-deskripsi-shs">
                        <div className="img-deskripsi-shs-wrapper">
                            <img
                            src="/images/akademik/sma/deskripsi-sma/sma.webp"
                            alt="deskripsi-shs"
                            className="img-deskripsi-shs"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi */}
            <div className="container-visi-misi-shs">
                <button className="edit-button-visi-misi-shs">
                    Edit <FaEdit className="icon-edit-visi-misi-shs" />
                </button>

                <div className="section-visi-misi-shs">
                    <div className="visi-misi-shs-card">
                        <h3 className="title-visi-misi-shs">Visi</h3>
                        <p className="text-visi-shs">
                            Menjadi lembaga pendidikan dasar yang unggul dalam membentuk karakter islami, cerdas, dan berwawasan global.
                        </p>
                        <div className="moto-shs-wrapper">
                            <h4 className="moto-shs-title">Moto</h4>
                            <p className="moto-shs-text">"Belajar dengan Iman, Tumbuh dengan Ilmu, Berkarya dengan Akhlak"</p>
                        </div>
                    </div>
                    <div className="visi-misi-shs-card">
                        <h3 className="title-visi-misi-shs">Misi</h3>
                        <ul className="misi-list-shs">
                            <li><span>✔</span> Menanamkan nilai-nilai keislaman sejak dini.</li>
                            <li><span>✔</span> Meningkatkan kompetensi akademik dan non-akademik siswa.</li>
                            <li><span>✔</span> Mendorong kreativitas dan keterampilan abad 21.</li>
                            <li><span>✔</span> Mewujudkan lingkungan belajar yang aman dan menyenangkan.</li>
                            <li><span>✔</span> Menjalin kerjasama antara sekolah, orang tua, dan masyarakat.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Fasilitas shs */}
            <div className="container-fasilitas-shs">
                <button className="edit-button-fasilitas-shs">
                    Edit <FaEdit className="icon-edit-fasilitas-shs" />
                </button>
                <div className="section-fasilitas-shs">
                    <div className="head-fasilitas-shs">
                        <h2 className="tittle-fasilitas-shs">Fasilitas Sekolah</h2>
                    </div>

                    <div className="slider-fasilitas-wrapper-shs">
                        <button className="slider-fasilitas-shs-button left" onClick={() => scrollByCard(-1)}>
                            <FaAngleLeft />
                        </button>

                        <div className="card-fasilitas-wrapper-shs" ref={sliderRef}>
                            {fasilitasshsmaata.map((item, index) => (
                            <div key={index} className="fasilitas-card-shs">
                                <img src={item.src} alt={item.alt} className="fasilitas-img-shs" />
                                <div className="fasilitas-overlay-shs">
                                <h3>{item.title}</h3>
                                </div>
                            </div>
                            ))}
                        </div>

                        <button className="slider-fasilitas-shs-button right" onClick={() => scrollByCard(1)}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>







        
        
        </>
    );
}

export default Senior_High_School;
