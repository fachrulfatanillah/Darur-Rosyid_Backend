"use client";


import './Junior-High-School.css'
import { FaAngleRight, FaAngleLeft, FaEdit } from "react-icons/fa";
import { useRef, useEffect } from "react";


const Junior_High_School = () => {
    return (
        <Container_Jhs/>
    );
}


const Container_Jhs = () => {
    
    const sliderRef = useRef(null);

    const scrollByCard = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector(".fasilitas-card-jhs");
        if (!card) return;

        const scrollAmount = card.offsetWidth + 24;
        slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;
    
        let ijhsown = false;
        let startX;
        let scrollLeftStart;
    
        const handleMouseDown = (e) => {
          ijhsown = true;
          slider.classList.add("active");
          startX = e.pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
    
        const handleMouseMove = (e) => {
          if (!ijhsown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
    
        const handleMouseUp = () => (ijhsown = false);
        const handleMouseLeave = () => (ijhsown = false);
        const handleTouchStart = (e) => {
          ijhsown = true;
          startX = e.touches[0].pageX - slider.offsetLeft;
          scrollLeftStart = slider.scrollLeft;
        };
        const handleTouchMove = (e) => {
          if (!ijhsown) return;
          const x = e.touches[0].pageX - slider.offsetLeft;
          const walk = (x - startX) * 1.2;
          slider.scrollLeft = scrollLeftStart - walk;
        };
        const handleTouchEnd = () => (ijhsown = false);
    
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
    
      const fasilitasjhsmpata = [
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
            {/* Header-jhs */}        
            <div className="container-header-jhs">
                <button className="edit-button-header-jhs">
                    Edit <FaEdit className="icon-edit-header-jhs" />
                </button>

                <div className="section-header-jhs">
                    <div className="header-jhs">
                        <p className="sub-title-jhs">Sekolah Menengah Pertama Islam Terpadu</p>
                        <h2 className="title-jhs">Darur Rosyid</h2>
                    </div>
                </div>
            </div>


            {/* Deskripsi Sekolah */}
            <div className="container-deskripsi-jhs">
                <button className="edit-button-deskripsi-jhs">
                    Edit <FaEdit className="icon-edit-deskripsi-jhs" />
                </button>

                <div className="section-deskripsi-jhs">
                    <div className="left-deskripsi-jhs">
                        <div className="top-head-deskripsi-jhs">
                            <p className="sub-title-deskripsi-jhs">Selamat Datang di</p>
                            <h2 className="title-deskripsi-jhs">smpIT DARUR ROSYID</h2>
                            <p className="sub-title-akreditasi-jhs">TERAKREDITASI B</p>
                        </div>
                        <div className="bottom-deskripsi-jhs">
                            <p className="text-deskripsi-jhs">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis aut, excepturi, quo distinctio ipsum rem iure iusto quidem eos totam exercitationem porro eveniet reprehenderit corrupti pariatur perferendis esse recusandae?
                            </p>
                        </div>
                    </div>
                    <div className="right-deskripsi-jhs">
                        <div className="img-deskripsi-jhs-wrapper">
                            <img
                            src="/images/akademik/smp/deskripsi-smp/smp.webp"
                            alt="deskripsi-jhs"
                            className="img-deskripsi-jhs"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi */}
            <div className="container-visi-misi-jhs">
                <button className="edit-button-visi-misi-jhs">
                    Edit <FaEdit className="icon-edit-visi-misi-jhs" />
                </button>

                <div className="section-visi-misi-jhs">
                    <div className="visi-misi-jhs-card">
                        <h3 className="title-visi-misi-jhs">Visi</h3>
                        <p className="text-visi-jhs">
                            Menjadi lembaga pendidikan dasar yang unggul dalam membentuk karakter islami, cerdas, dan berwawasan global.
                        </p>
                        <div className="moto-jhs-wrapper">
                            <h4 className="moto-jhs-title">Moto</h4>
                            <p className="moto-jhs-text">"Belajar dengan Iman, Tumbuh dengan Ilmu, Berkarya dengan Akhlak"</p>
                        </div>
                    </div>
                    <div className="visi-misi-jhs-card">
                        <h3 className="title-visi-misi-jhs">Misi</h3>
                        <ul className="misi-list-jhs">
                            <li><span>✔</span> Menanamkan nilai-nilai keislaman sejak dini.</li>
                            <li><span>✔</span> Meningkatkan kompetensi akademik dan non-akademik siswa.</li>
                            <li><span>✔</span> Mendorong kreativitas dan keterampilan abad 21.</li>
                            <li><span>✔</span> Mewujudkan lingkungan belajar yang aman dan menyenangkan.</li>
                            <li><span>✔</span> Menjalin kerjasama antara sekolah, orang tua, dan masyarakat.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Fasilitas jhs */}
            <div className="container-fasilitas-jhs">
                <button className="edit-button-fasilitas-jhs">
                    Edit <FaEdit className="icon-edit-fasilitas-jhs" />
                </button>
                <div className="section-fasilitas-jhs">
                    <div className="head-fasilitas-jhs">
                        <h2 className="tittle-fasilitas-jhs">Fasilitas Sekolah</h2>
                    </div>

                    <div className="slider-fasilitas-wrapper-jhs">
                        <button className="slider-fasilitas-jhs-button left" onClick={() => scrollByCard(-1)}>
                            <FaAngleLeft />
                        </button>

                        <div className="card-fasilitas-wrapper-jhs" ref={sliderRef}>
                            {fasilitasjhsmpata.map((item, index) => (
                            <div key={index} className="fasilitas-card-jhs">
                                <img src={item.src} alt={item.alt} className="fasilitas-img-jhs" />
                                <div className="fasilitas-overlay-jhs">
                                <h3>{item.title}</h3>
                                </div>
                            </div>
                            ))}
                        </div>

                        <button className="slider-fasilitas-jhs-button right" onClick={() => scrollByCard(1)}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>







        
        
        </>
    );
}

export default Junior_High_School;
