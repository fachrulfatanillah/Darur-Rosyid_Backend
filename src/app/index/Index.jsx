"use client";

import './Index.css';
import { FaGraduationCap, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useRef, useEffect } from "react";


const Index = () => {
    return(
        <Container_Index/>
    );
}

const Container_Index = () => {
    const sliderRef = useRef(null);

    const scrollByCard = (direction) => {
      const slider = sliderRef.current;
      if (!slider) return;
  
      const card = slider.querySelector(".fasilitas-card");
      if (!card) return;
  
      const scrollAmount = card.offsetWidth + 24; 
      slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };
  
    useEffect(() => {
      const slider = sliderRef.current;
      if (!slider) return;
  
      let isDown = false;
      let startX;
      let scrollLeftStart;
  
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
  
      const handleMouseUp = () => {
        isDown = false;
        slider.classList.remove("active");
      };
  
      const handleMouseLeave = () => {
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
  
      const handleTouchEnd = () => {
        isDown = false;
      };
  
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

    const fasilitasData = [
        {
          src: "/images/fasilitas/kamar-dummy.webp",
          alt: "Asrama Nyaman",
          title: "Asrama Nyaman",
        },
        {
          src: "/images/fasilitas/kamar-dummy.webp",
          alt: "Ruang Makan",
          title: "Ruang Makan Bersih",
        },
        {
          src: "/images/fasilitas/kamar-dummy.webp",
          alt: "Ruang Kelas",
          title: "Kelas Nyaman",
        },
        {
          src: "/images/fasilitas/kamar-dummy.webp",
          alt: "Perpustakaan",
          title: "Perpustakaan Lengkap",
        },
        {
          src: "/images/fasilitas/kamar-dummy.webp",
          alt: "Lapangan Olahraga",
          title: "Lapangan Olahraga",
        },
        {
          src: "/images/fasilitas/kamar-dummy.webp",
          alt: "Laboratorium",
          title: "Lab Komputer Modern",
        },
    ];
      
  


    return (
        <>
            <div className="container-index">
                <div className="section-bg-index">
                    <img src="/images/index/dummy-pict.webp" alt="Banner" className="background-image-index" />
                    <div className="overlay-text-index">
                        <h2>Pondok Pesantren Modern Darur Rosyid</h2>
                        <p>Ini adalah teks di atas gambar yang ditengahkan.</p>
                    </div>
                </div>
            </div>

            {/* Akademik */}
            <div className="container-akademik">
                <div className="section-akademik">
                    <div className="header-akademik">
                        <h2 className="title-akademik">AKADEMIK</h2>
                    </div>

                    <div className="card-akademik-wrapper">
                        <div className="akademik-card">
                            <div className="icon-wrapper-akademik">
                                <FaGraduationCap className="icon-akademik" />
                            </div>
                            <h3>Judul Akademik</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae adipisci mollitia quod neque numquam ex fugit. Deleniti illo nulla quisquam, rerum, eius velit recusandae accusantium, tenetur debitis voluptate asperiores iure.</p>
                        </div>

                        <div className="akademik-card">
                            <div className="icon-wrapper-akademik">
                                <FaGraduationCap className="icon-akademik" />
                            </div>
                            <h3>Judul Akademik 2</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quae impedit ad aut commodi fugiat sit. Facere, quas fugit! Sed praesentium accusantium dolor architecto atque illum, eum tempore asperiores ratione.</p>
                        </div>
                        <div className="akademik-card">
                            <div className="icon-wrapper-akademik">
                                <FaGraduationCap className="icon-akademik" />
                            </div>
                            <h3>Judul Akademik 3</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, consequatur saepe. Nesciunt animi distinctio natus, fugiat libero possimus quibusdam est praesentium accusantium vero atque veniam sed? Suscipit vel exercitationem fugit?</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fakta Pesantren */}
            <div className="container-fakta">
                <div className="section-fakta">
                    <div className="head-fakta">
                        <h2 className="tittle-fakta">Fakta Pesantren Darur Rosyid</h2>
                    </div>
                    <div className="body-fakta">
                        <div className="fakta-card">
                            <span className="fakta-angka">1020</span>
                            <span className="fakta-label">Pengajar</span>
                        </div>
                        <div className="fakta-card">
                            <span className="fakta-angka">1500</span>
                            <span className="fakta-label">Santriwan/Santriwati</span>
                        </div>
                        <div className="fakta-card">
                            <span className="fakta-angka">1000</span>
                            <span className="fakta-label">Alumni</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Fasilitas */}
            <div className="container-fasilitas">
                <div className="section-fasilitas">
                    <div className="head-fasilitas">
                        <h2 className="tittle-fasilitas">Fasilitas Pesantren</h2>
                    </div>

                    <div className="slider-fasilitas-wrapper">
                        <button className="slider-button left" onClick={() => scrollByCard(-1)}>
                            <FaAngleLeft  />
                        </button>

                        <div className="card-fasilitas-wrapper" ref={sliderRef}>
                            {fasilitasData.map((item, index) => (
                                <div key={index} className="fasilitas-card">
                                <img src={item.src} alt={item.alt} className="fasilitas-img" />
                                <div className="fasilitas-overlay">
                                    <h3>{item.title}</h3>
                                </div>
                                </div>
                            ))}
                        </div>


                        <button className="slider-button right" onClick={() => scrollByCard(1)}>
                            <FaAngleRight  />
                        </button>
                    </div>
                </div>
            </div>

            {/* Kehidupan Pesantren */}
            <div className="container-kehidupan-pesantren">
                <div className="section-kehidupan">
                    <div className="head-kehidupan">
                        <h2 className="tittle-kehidupan">Kehidupan Pesantren</h2>
                        <p className="sub-tittle-kehidupan">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, numquam alias, nemo officiis magni quam dignissimos odio a harum repudiandae temporibus eos repellat, accusamus quisquam tempora repellendus eveniet tempore libero!
                        </p>
                    </div>

                    <div className="card-kehidupan-wrapper">
                        <div className="card-kehidupan">
                            <img
                            src="/images/fasilitas/kamar-dummy.webp"
                            alt="Asrama"
                            className="fasilitas-img"
                            />
                            <h3>Kegiatan Mengaji</h3>
                            <p>Santri mengikuti pengajian kitab kuning setiap sore bersama para ustadz di aula utama.</p>
                        </div>
                        <div className="card-kehidupan">
                            <img
                            src="/images/fasilitas/kamar-dummy.webp"
                            alt="Asrama"
                            className="fasilitas-img"
                            />
                            <h3>Kegiatan Mengaji</h3>
                            <p>Santri mengikuti pengajian kitab kuning setiap sore bersama para ustadz di aula utama.</p>
                        </div>
                        <div className="card-kehidupan">
                            <img
                            src="/images/fasilitas/kamar-dummy.webp"
                            alt="Asrama"
                            className="fasilitas-img"
                            />
                            <h3>Kegiatan Mengaji</h3>
                            <p>Santri mengikuti pengajian kitab kuning setiap sore bersama para ustadz di aula utama.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Index;