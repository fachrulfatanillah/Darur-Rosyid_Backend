"use client";
import './Living.css'
import { useEffect, useState } from "react";

const Living = () => {
    return(
        <Container_Living/>
    );
}

const Container_Living = () => {

    const [livingInfo, setLivingInfo] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await fetch('/api/living-info');
        const result = await res.json();
        setLivingInfo(result.livingInfo);
        setActivities(result.activities);
        } catch (error) {
        console.error("Gagal memuat data living-info", error);
        } finally {
        setLoading(false); // jangan lupa ini
        }
    };

    fetchData();
    }, []);

    if (loading) return <p>Memuat data lingkungan...</p>;
    if (!livingInfo || livingInfo.length === 0) return <p>Data lingkungan tidak tersedia</p>;

    return(
        <>
            <div className="container-living">
                <div className="section-living">
                    <div className="header-living">
                        <h2 className="title-living">Fasilitas Pesantren</h2>
                    </div>
                </div>
            </div>

            {livingInfo.map((item, index) => (
                <div
                    key={item.id}
                    className={`container-fasilitas-${index % 2 === 0 ? "unggulan" : "olahraga"}`}
                >
                    <div
                    className={`section-fasilitas-${index % 2 === 0 ? "unggulan" : "olahraga"}`}
                    >
                    {index % 2 === 0 ? (
                        // Gambar di kanan (layout: teks kiri - gambar kanan)
                        <>
                        <div className="right-fasilitas-unggulan">
                            <div className="img-fasilitas-wrapper">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="img-fasilitas-unggulan"
                            />
                            </div>
                        </div>
                        <div className="left-fasilitas-unggulan">
                            <div className="top-head-fasilitas-unggulan">
                            <h2 className="title-fasilitas-unggulan">{item.title}</h2>
                            </div>
                            <div className="bottom-fasilitas-unggulan">
                            <p className="text-fasilitas-unggulan">{item.paragraph}</p>
                            </div>
                        </div>
                        </>
                    ) : (
                        // Gambar di kiri (layout: gambar kiri - teks kanan)
                        <>
                        <div className="left-fasilitas-olahraga">
                            <div className="top-head-fasilitas-olahraga">
                                <h2 className="title-fasilitas-olahraga">{item.title}</h2>
                            </div>
                            <div className="bottom-fasilitas-olahraga">
                                <p className="text-fasilitas-olahraga">{item.paragraph}</p>
                            </div>
                        </div>
                        <div className="right-fasilitas-olahraga">
                            <div className="img-olahraga-wrapper">
                                <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="img-fasilitas-olahraga"
                                />
                            </div>
                        </div>
                        </>
                    )}
                    </div>
                </div>
            ))}

            {/* Aktivitas Pesantren */}
            <div className="container-aktivitas-pesantren">
                <div className="section-aktivitas">
                    <div className="head-aktivitas">
                        <h2 className="tittle-aktivitas">Aktivitas Pesantren</h2>
                    </div>
                    <div className="card-wrapper-aktivitas">
                        {activities.map((act) => (
                            <div key={act.id} className="card-aktivitas">
                            <img
                                src={act.imageUrl}
                                alt={act.title}
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>{act.title}</h3>
                            </div>
                        </div>
                        ))}
                        {/* <div className="card-aktivitas">
                            <img
                                src="/images/kehidupan-pesantren/aktivitas/aktivitas-dummy.webp"
                                alt="aktivitas-card"
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>Kesenian & Budaya</h3>
                            </div>
                        </div>
                        <div className="card-aktivitas">
                            <img
                                src="/images/kehidupan-pesantren/aktivitas/aktivitas-dummy.webp"
                                alt="aktivitas-card"
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>Olahraga</h3>
                            </div>
                        </div>
                        <div className="card-aktivitas">
                            <img
                                src="/images/kehidupan-pesantren/aktivitas/aktivitas-dummy.webp"
                                alt="aktivitas-card"
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>Kerohanian</h3>
                            </div>
                        </div>
                        <div className="card-aktivitas">
                            <img
                                src="/images/kehidupan-pesantren/aktivitas/aktivitas-dummy.webp"
                                alt="aktivitas-card"
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>Penalaran</h3>
                            </div>
                        </div>
                        <div className="card-aktivitas">
                            <img
                                src="/images/kehidupan-pesantren/aktivitas/aktivitas-dummy.webp"
                                alt="aktivitas-card"
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>Sosial</h3>
                            </div>
                        </div>
                        <div className="card-aktivitas">
                            <img
                                src="/images/kehidupan-pesantren/aktivitas/aktivitas-dummy.webp"
                                alt="aktivitas-card"
                                className="aktivitas-img"
                            />
                            <div className="aktivitas-overlay">
                                <h3>Kegiatan Lainnya</h3>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>




        
        </>
    );
}

export default Living;