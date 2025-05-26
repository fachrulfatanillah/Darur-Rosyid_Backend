"use client";

import './About.css'
import { FaEdit  } from "react-icons/fa";
import { IoClose, IoAddSharp   } from "react-icons/io5";
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

    const [showModalAboutHeader, setShowModalAboutHeader] = useState(false);
    const [images, setImages] = useState({
        left: "",
        rightTop: "",
        rightBottom: "",
    });

    // Ambil data about_info dan misi
    const fetchAbout = async () => {
        try {
        const res = await fetch("/api/about-info");
        const result = await res.json();
        setAbout(result.about);
        setMissions(result.missions);
        } catch (err) {
        console.error("Gagal mengambil data about_info", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchAbout();
    }, []);

    // Handle input file
    const handleImageChange = (e, position) => {
        const file = e.target.files[0];
        if (file) {
        setImages((prev) => ({
            ...prev,
            [position]: file,
        }));
        }
    };

    // Handle simpan gambar
    const handleSaveImagesBanner = async () => {
        const imageData = {};

        try {
        const uploadImage = async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload-contact-image", {
            method: "POST",
            body: formData,
            });
            if (!res.ok) throw new Error("Upload gagal");
            const data = await res.json();
            return data.imageUrl;
        };

        if (images.left) {
            imageData.image1Url = await uploadImage(images.left);
        }
        if (images.rightTop) {
            imageData.image2Url = await uploadImage(images.rightTop);
        }
        if (images.rightBottom) {
            imageData.image3Url = await uploadImage(images.rightBottom);
        }

        if (Object.keys(imageData).length === 0) {
            return;
        }

        const patchRes = await fetch("/api/about-info/update-images", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(imageData),
        });

        const result = await patchRes.json();

        if (patchRes.ok) {
            setShowModalAboutHeader(false);
            setImages({ left: "", rightTop: "", rightBottom: "" });
            await fetchAbout(); // Refresh data
        }
        } catch (error) {
        console.error(error);
        }
    };

    {/* About Main */} 
    const [showModalAboutMain, setShowModalAboutMain] = useState(false);
    const [aboutMain, setAboutMain] = useState({
        heading: "",
        description: "",
        leaderName: "",
        leaderTitle: "",
        image: null,
    });

    const handleSaveAboutMain = async () => {
        const dataToUpdate = {
            heading: aboutMain.heading,
            description: aboutMain.description,
            leaderName: aboutMain.leaderName,
            leaderTitle: aboutMain.leaderTitle,
        };

        try {
            if (aboutMain.image) {
            const formData = new FormData();
            formData.append("file", aboutMain.image);
            const uploadRes = await fetch("/api/upload-contact-image", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Upload gambar gagal");

            const uploadData = await uploadRes.json();
            dataToUpdate.image4Url = uploadData.imageUrl;
            }

            const res = await fetch("/api/about-info/update-main", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToUpdate),
            });

            const result = await res.json();

            if (res.ok) {
            setShowModalAboutMain(false);
            await fetchAbout(); // refresh data
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    {/* About Visi */} 
    const [showModalEditVision, setShowModalEditVision] = useState(false);
    const [vision, setVision] = useState("");

    const handleSaveVision = async () => {
        if (!vision.trim()) {
            alert("Visi tidak boleh kosong.");
            return;
        }

        try {
            const res = await fetch("/api/about-info/update-vision", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vision }),
            });

            const result = await res.json();

            if (res.ok) {
                setShowModalEditVision(false);
                await fetchAbout();
            }
        } catch (error) {
            console.error(error);
        }
    };


    {/* Add Misi */} 
    const [showModalAddMission, setShowModalAddMission] = useState(false);
    const [newMission, setNewMission] = useState("");
    const handleAddMission = async () => {
        if (!newMission.trim()) {
            alert("Misi tidak boleh kosong.");
            return;
        }

        try {
            const res = await fetch("/api/about-info/add-mission", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newMission }),
            });

            const result = await res.json();

            if (res.ok) {
                setShowModalAddMission(false);
                setNewMission("");
                await fetchAbout();
            }
        } catch (error) {
            console.error(error);
        }
    };

    {/* Edit Misi */} 
    const [showModalEditMission, setShowModalEditMission] = useState(false);
    const [editMission, setEditMission] = useState(null);

    const handleSaveMission = async () => {
        if (!editMission?.text.trim()) {
            alert("Misi tidak boleh kosong.");
            return;
        }

        try {
            const res = await fetch(`/api/about-info/update-mission/${editMission.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: editMission.text }),
            });

            const result = await res.json();

            if (res.ok) {
            setShowModalEditMission(false);
            setEditMission(null);
            await fetchAbout();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMission = async () => {

        try {
            const res = await fetch(`/api/about-info/update-mission/${editMission.id}`, {
            method: "DELETE",
            });

            const result = await res.json();

            if (res.ok) {
            setShowModalEditMission(false);
            setEditMission(null);
            await fetchAbout();
            }
        } catch (error) {
            console.error(error);
        }
    };




    if (loading) return <p>Memuat data kontak...</p>;
    if (!about) return <p>Data kontak tidak tersedia</p>;

    return (
        <section className='section-about'>
            <div className="container-about">
                <div className="about-title-header">
                        <h3>Tentang</h3>
                        <h2>Darur Rosyid</h2>
                </div>

                {/* About Header */} 
                <div className="about-header">
                    <div className="button-about-header">
                        <button className="edit-button-about-header" onClick={() => setShowModalAboutHeader(true)}>
                            Edit <FaEdit className="icon-edit-about-header" />
                        </button>
                    </div>

                    <div className="about-header-img">
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

                    {showModalAboutHeader && (
                    <div className="modal-overlay-about">
                        <div className="modal-about">
                            <div className="modal-close-about" onClick={() => setShowModalAboutHeader(false)}>
                                <IoClose />
                            </div>
                            <h3>Edit Gambar</h3>
                            <label>
                                Gambar Kiri:
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "left")} />
                            </label>
                            <label>
                                Gambar Kanan Atas:
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "rightTop")} />
                            </label>
                            <label>
                                Gambar Kanan Bawah:
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "rightBottom")} />
                            </label>
                            <div className="modal-actions-about">
                                <button onClick={handleSaveImagesBanner}>Simpan</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* About Main */} 
                <div className="about-main">
                    <div className="button-about-main">
                        <button className="edit-button-about-main" onClick={() => {
                            setAboutMain({
                            heading: about.heading,
                            description: about.description,
                            leaderName: about.leaderName,
                            leaderTitle: about.leaderTitle,
                            image: null,
                            });
                            setShowModalAboutMain(true);
                        }}>
                            Edit <FaEdit className="icon-edit-about-main" />
                        </button>
                    </div>
                    <div className="about-main-content">
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

                    {showModalAboutMain && (
                        <div className="modal-overlay-about">
                            <div className="modal-about">
                            <div className="modal-close-about" onClick={() => setShowModalAboutMain(false)}>
                                <IoClose />
                            </div>
                            <h3>Edit Kepala Sekolah</h3>

                            <label>
                                Gambar Kiri:
                                <input type="file" accept="image/*" onChange={(e) => setAboutMain((prev) => ({ ...prev, image: e.target.files[0] }))} />
                            </label>

                            <label>
                                Judul:
                                <input
                                type="text"
                                value={aboutMain.heading}
                                onChange={(e) => setAboutMain((prev) => ({ ...prev, heading: e.target.value }))}
                                />
                            </label>

                            <label>
                                Deskripsi:
                                <textarea
                                className="modal-textarea-about"
                                value={aboutMain.description}
                                onChange={(e) => setAboutMain((prev) => ({ ...prev, description: e.target.value }))}
                                />
                            </label>

                            <label>
                                Nama Kepala:
                                <input
                                type="text"
                                value={aboutMain.leaderName}
                                onChange={(e) => setAboutMain((prev) => ({ ...prev, leaderName: e.target.value }))}
                                />
                            </label>

                            <label>
                                Jabatan Kepala:
                                <input
                                type="text"
                                value={aboutMain.leaderTitle}
                                onChange={(e) => setAboutMain((prev) => ({ ...prev, leaderTitle: e.target.value }))}
                                />
                            </label>

                            <div className="modal-actions-about">
                                <button onClick={handleSaveAboutMain}>Simpan</button>
                            </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* About VisiMisi */} 
                <div className="about-vision-mision">
                    <div className="button-about-vision-mision">
                        <button className="edit-button-about-vision-mision" onClick={() => {
                        setVision(about.vision);
                        setShowModalEditVision(true);
                        }}>
                            Edit <FaEdit />
                        </button>
                    </div>

                    {/* Visi Section */}
                    <div className="about-vision-content">
                        <div className="about-vision">
                            <h3>Visi</h3>
                            <p>{about.vision}</p>
                        </div>
                    </div>

                    {/* Misi Section */}
                    <div className="about-mision-content">
                        <div className="mision-button">
                            <button className="add-button-about-mision" onClick={() => setShowModalAddMission(true)}>
                                Tambah <IoAddSharp />
                            </button>
                        </div>

                        <div className="about-mision">
                            <h3>Misi</h3>
                            <ul className="about-mision-list">
                                {missions.map((misi) => (
                                    <li key={misi.id}>{misi.text} 
                                        <button className="edit-button-about-mision" onClick={() => {
                                            setEditMission(misi);
                                            setShowModalEditMission(true);
                                        }}>
                                            Edit <FaEdit />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Modal Edit Visi */}
                {showModalEditVision && (
                    <div className="modal-overlay-about">
                        <div className="modal-about">
                        <div className="modal-close-about" onClick={() => setShowModalEditVision(false)}>
                            <IoClose />
                        </div>
                        <h3>Edit Visi</h3>
                        <label>
                            Visi:
                            <textarea
                            className="modal-textarea-about"
                            placeholder="Tulis visi di sini..."
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                            ></textarea>
                        </label>
                        <div className="modal-actions-about">
                            <button className="save-button-about" onClick={handleSaveVision}>Simpan</button>
                        </div>
                        </div>
                    </div>
                )}


                {/* Modal Tambah Misi */}
                {showModalAddMission && (
                    <div className="modal-overlay-about">
                        <div className="modal-about">
                            <div className="modal-close-about" onClick={() => setShowModalAddMission(false)}>
                                <IoClose />
                            </div>
                            <h3>Tambah Misi</h3>
                            <label>
                                Misi:
                                <textarea
                                className="modal-textarea-about"
                                placeholder="Tulis misi baru..."
                                value={newMission}
                                onChange={(e) => setNewMission(e.target.value)}
                                ></textarea>
                            </label>
                            <div className="modal-actions-about">
                                <button className="save-button-about" onClick={handleAddMission}>Simpan</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Edit Misi */}
                {showModalEditMission && editMission && (
                    <div className="modal-overlay-about">
                        <div className="modal-about">
                        <div className="modal-close-about" onClick={() => {
                            setShowModalEditMission(false);
                            setEditMission(null);
                        }}>
                            <IoClose />
                        </div>
                        <h3>Edit Misi</h3>
                        <label>
                            Isi:
                            <textarea
                            className="modal-textarea-about"
                            placeholder="Ubah misi..."
                            value={editMission.text}
                            onChange={(e) =>
                                setEditMission((prev) => ({ ...prev, text: e.target.value }))
                            }
                            />
                        </label>
                        <div className="modal-actions-about">
                            <button className="delete-button-about" onClick={handleDeleteMission}>
                            Hapus
                            </button>
                            <button className="save-button-about" onClick={handleSaveMission}>
                            Simpan
                            </button>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default About;