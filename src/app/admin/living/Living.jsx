"use client";
import './Living.css'
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";


const Living = () => {
    return(
        <Container_Living/>
    );
}

const Container_Living = () => {

    const [livingInfo, setLivingInfo] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        try {
        const res = await fetch("/api/living-info");
        const result = await res.json();
        setLivingInfo(result.livingInfo);
        setActivities(result.activities);
        } catch (error) {
        console.error("Gagal memuat data living-info", error);
        } finally {
        setLoading(false);
        setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [showAddModalFasilitasUnggulan, setAddModalFasilitasUnggulan] = useState(false);
    const [addFasilitasUnggulan, setAddFasilitasUnggulan] = useState({
        title: "",
        paragraph: "",
        imageUrl: "",
    });
    const [imageFile, setImageFile] = useState(null);

    const handleSubmitAdd = async () => {
        const { title, paragraph } = addFasilitasUnggulan;

        if (!title || !paragraph || !imageFile) {
        alert("Semua field wajib diisi");
        return;
        }

        try {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload-contact-image", {
            method: "POST",
            body: formData,
        });

        if (!uploadRes.ok) {
            return;
        }

        const uploadData = await uploadRes.json();
        const uploadedImageUrl = uploadData.imageUrl;

        const res = await fetch("/api/living-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            ...addFasilitasUnggulan,
            imageUrl: uploadedImageUrl,
            }),
        });

        const result = await res.json();
        if (res.ok) {
            setAddFasilitasUnggulan({ title: "", paragraph: "", imageUrl: "" });
            setImageFile(null);
            setAddModalFasilitasUnggulan(false);
            await fetchData();
        } else {
        }
        } catch (error) {
        console.error(error);
        }
    };

    const [showEditModalFasilitasUnggulan, setEditModalFasilitasUnggulan] = useState(false);
    const [editFasilitas, setEditFasilitas] = useState(null);
    const [editImageFile, setEditImageFile] = useState(null);

    const handleSubmitEdit = async () => {
        if (!editFasilitas?.id) return;

        const updatePayload = {};

        if (editImageFile) {
        try {
            const formData = new FormData();
            formData.append("file", editImageFile);

            const uploadRes = await fetch("/api/upload-contact-image", {
            method: "POST",
            body: formData,
            });

            if (!uploadRes.ok) {
            alert("Gagal upload gambar baru");
            return;
            }

            const uploadData = await uploadRes.json();
            updatePayload.imageUrl = uploadData.imageUrl;
        } catch (error) {
            console.error("Upload error:", error);
            alert("Terjadi kesalahan saat upload gambar");
            return;
        }
        }

        if (editFasilitas.title?.trim()) updatePayload.title = editFasilitas.title;
        if (editFasilitas.paragraph?.trim()) updatePayload.paragraph = editFasilitas.paragraph;

        if (Object.keys(updatePayload).length === 0) {
        alert("Tidak ada perubahan yang dikirim.");
        return;
        }

        try {
        const res = await fetch(`/api/living-info/${editFasilitas.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(updatePayload),
        });

        const result = await res.json();

        if (res.ok) {
            setEditModalFasilitasUnggulan(false);
            setEditFasilitas(null);
            setEditImageFile(null);
            await fetchData(); // 🔁 refresh data
        }
        } catch (error) {
        console.error(error);
        }
    };

    const handleDeleteFasilitas = async () => {
        if (!editFasilitas?.id) return;

        try {
            const res = await fetch(`/api/living-info/${editFasilitas.id}`, {
            method: "DELETE",
            });

            const result = await res.json();

            if (res.ok) {
            setEditModalFasilitasUnggulan(false);
            setEditFasilitas(null);
            setEditImageFile(null);
            await fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // add living aktivitas
    const [showAddModalAktifitas, setAddModalAktifitas] = useState(false);
    const [newActivityTitle, setNewActivityTitle] = useState("");
    const [newActivityImageFile, setNewActivityImageFile] = useState(null);
    
    const handleSubmitActivityAdd = async () => {
        if (!newActivityTitle || !newActivityImageFile) {
            alert("Judul dan gambar wajib diisi");
            return;
        }
        
        try {
            // Upload gambar terlebih dahulu
            const formData = new FormData();
            formData.append("file", newActivityImageFile);
            
            const uploadRes = await fetch("/api/upload-contact-image", {
                method: "POST",
                body: formData,
            });
            
            if (!uploadRes.ok) {
                alert("Gagal upload gambar");
                return;
            }
            
            const uploadData = await uploadRes.json();
            const uploadedImageUrl = uploadData.imageUrl;
            
            // Kirim ke API untuk menyimpan data aktivitas
            const res = await fetch("/api/living-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newActivityTitle,
                    imageUrl: uploadedImageUrl,
                }),
            });
            
            const result = await res.json();
            
            if (res.ok) {
                setNewActivityTitle("");
                setNewActivityImageFile(null);
                setAddModalAktifitas(false);
                await fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // add living aktivitas
    const [showEditModalAktifitas, setEditModalAktifitas] = useState(false);
    const [editAktifitas, setEditAktifitas] = useState(null);
    const [editAktifitasImageFile, setEditAktifitasImageFile] = useState(null);

    const handleSubmitEditAktifitas = async () => {
        if (!editAktifitas?.id) return;

        const updatePayload = {};

        // Upload gambar baru jika dipilih
        if (editAktifitasImageFile) {
            try {
            const formData = new FormData();
            formData.append("file", editAktifitasImageFile);

            const uploadRes = await fetch("/api/upload-contact-image", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) {
                alert("Gagal upload gambar");
                return;
            }

            const uploadData = await uploadRes.json();
            updatePayload.imageUrl = uploadData.imageUrl;
            } catch (error) {
            console.error("Upload error:", error);
            alert("Terjadi kesalahan saat upload gambar");
            return;
            }
        }

        if (editAktifitas.title?.trim()) {
            updatePayload.title = editAktifitas.title;
        }

        if (Object.keys(updatePayload).length === 0) {
            alert("Tidak ada perubahan");
            return;
        }

        try {
            const res = await fetch(`/api/living-activity/${editAktifitas.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatePayload),
            });

            const result = await res.json();

            if (res.ok) {
            setEditModalAktifitas(false);
            setEditAktifitas(null);
            setEditAktifitasImageFile(null);
            await fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteAktifitas = async (id, title) => {
        try {
            const res = await fetch(`/api/living-activity/${id}`, {
            method: "DELETE",
            });

            const result = await res.json();

            if (res.ok) {
                await fetchData();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    if (loading) return <p>Memuat data lingkungan...</p>;
    
    return(
        <>
        {refreshing && <p>Memuat ulang data...</p>}
            <div className="container-living">
                <div className="section-living">
                    <div className="header-living">
                        <h2 className="title-living">Fasilitas Pesantren</h2>
                    </div>
                </div>
            </div>

            <div className="living-add-btn">
                <button className='add-button-living' onClick={() => setAddModalFasilitasUnggulan(true)}>
                    Tambah <FaEdit className="icon-edit-fasilitas-unggulan" />
                </button>
            </div>
            
            {/* Fasilitas Unggulan */}
            {livingInfo.map((item, index) => (
                <div
                    key={item.id}
                    className={`container-fasilitas-${index % 2 === 0 ? "unggulan" : "olahraga"}`}
                >
                    <div
                    className={`section-fasilitas-${index % 2 === 0 ? "unggulan" : "olahraga"}`}
                    >
                    <button className="edit-button-fasilitas-unggulan" onClick={() => {setEditFasilitas(item); setEditModalFasilitasUnggulan(true);}}>
                        Edit <FaEdit className="icon-edit-fasilitas-unggulan" />
                    </button>
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

            {/* Modal Add Fasilitas Unggulan */}
            {showAddModalFasilitasUnggulan && (
                <div className="modal-overlay-header-contact">
                    <div className="modal-header-contact">
                        <div
                        className="modal-close-button-header-contact"
                        onClick={() => setAddModalFasilitasUnggulan(false)}
                        >
                        <IoClose />
                        </div>
                        <h3>Tambah Data Fasilitas</h3>

                        <label>
                        Ganti Gambar:
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                        </label>

                        <label>
                        Judul :
                        <input
                            type="text"
                            value={addFasilitasUnggulan.title}
                            onChange={(e) =>
                            setAddFasilitasUnggulan((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                            }
                        />
                        </label>

                        <label>
                        Paragraph:
                        <textarea
                            className="modal-textarea-contact"
                            placeholder="Isi deskripsi"
                            value={addFasilitasUnggulan.paragraph}
                            onChange={(e) =>
                            setAddFasilitasUnggulan((prev) => ({
                                ...prev,
                                paragraph: e.target.value,
                            }))
                            }
                        />
                        </label>

                        <div className="modal-actions-header-contact">
                        <button onClick={handleSubmitAdd}>Simpan</button>
                        </div>
                    </div>
                    </div>
            )}

            {/* Modal Edit Fasilitas Unggulan */}
            {showEditModalFasilitasUnggulan && editFasilitas && (
                <div className="modal-overlay-header-contact">
                    <div className="modal-header-contact">
                    <div
                        className="modal-close-button-header-contact"
                        onClick={() => {
                        setEditModalFasilitasUnggulan(false);
                        setEditFasilitas(null);
                        setEditImageFile(null);
                        }}
                    >
                        <IoClose />
                    </div>

                    <h3>Edit Data Fasilitas</h3>

                    <label>
                        Ganti Gambar:
                        <input type="file" onChange={(e) => setEditImageFile(e.target.files[0])} />
                    </label>

                    <label>
                        Judul:
                        <input
                        type="text"
                        value={editFasilitas.title}
                        onChange={(e) =>
                            setEditFasilitas((prev) => ({ ...prev, title: e.target.value }))
                        }
                        />
                    </label>

                    <label>
                        Paragraph:
                        <textarea
                        className="modal-textarea-contact"
                        value={editFasilitas.paragraph}
                        onChange={(e) =>
                            setEditFasilitas((prev) => ({ ...prev, paragraph: e.target.value }))
                        }
                        />
                    </label>

                    <div className="modal-actions-header-contact">
                        <button className="button-modal-delete" onClick={handleDeleteFasilitas}>Hapus</button>
                        <button onClick={handleSubmitEdit}>Simpan</button>
                    </div>
                    </div>
                </div>
            )}

            {/* Aktivitas Pesantren */}
            <div className="container-aktivitas-pesantren">
                <button className="edit-button-aktivitas" onClick={() => setAddModalAktifitas(true)}>
                    Tambah <FaEdit className="icon-edit-aktivitas" />
                </button>

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
                                    <div className="aktivitas-overlay-content">
                                    <h3>{act.title}</h3>
                                    <div className="aktivitas-btn-wrapper">
                                        <button
                                        className="btn-edit"
                                        onClick={() => {
                                            setEditAktifitas(act);
                                            setEditModalAktifitas(true);
                                        }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                        className="btn-delete"
                                        onClick={() => handleDeleteAktifitas(act.id, act.title)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Add Living Aktivity */}
            {showAddModalAktifitas && (
                <div className="modal-overlay-header-contact">
                    <div className="modal-header-contact">
                    <div
                        className="modal-close-button-header-contact"
                        onClick={() => setAddModalAktifitas(false)}
                    >
                        <IoClose />
                    </div>

                    <h3>Tambah Data Aktivitas</h3>

                    <label>
                        Ganti Gambar:
                        <input type="file" onChange={(e) => setNewActivityImageFile(e.target.files[0])} />
                    </label>

                    <label>
                        Judul:
                        <input
                        type="text"
                        value={newActivityTitle}
                        onChange={(e) => setNewActivityTitle(e.target.value)}
                        />
                    </label>

                    <div className="modal-actions-header-contact">
                        <button onClick={handleSubmitActivityAdd}>Simpan</button>
                    </div>
                    </div>
                </div>
            )}

            {/* Modal Edit Living Aktivity */}
            {showEditModalAktifitas && editAktifitas && (
                <div className="modal-overlay-header-contact">
                    <div className="modal-header-contact">
                    <div
                        className="modal-close-button-header-contact"
                        onClick={() => {
                        setEditModalAktifitas(false);
                        setEditAktifitas(null);
                        setEditAktifitasImageFile(null);
                        }}
                    >
                        <IoClose />
                    </div>

                    <h3>Edit Data Aktivitas</h3>

                    <label>
                        Ganti Gambar:
                        <input type="file" onChange={(e) => setEditAktifitasImageFile(e.target.files[0])} />
                    </label>

                    <label>
                        Judul:
                        <input
                        type="text"
                        value={editAktifitas.title}
                        onChange={(e) =>
                            setEditAktifitas((prev) => ({ ...prev, title: e.target.value }))
                        }
                        />
                    </label>

                    <div className="modal-actions-header-contact">
                        <button onClick={handleSubmitEditAktifitas}>Simpan</button>
                    </div>
                    </div>
                </div>
            )}




        
        </>
    );
}

export default Living;