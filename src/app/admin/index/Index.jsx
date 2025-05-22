'use client';
import './Index.css'
import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";

const Admin_Index = () => {
    return(
        <Section_Admin_Index/>
    );
}

const Section_Admin_Index = () => {
    // start header
    const [isContentVisible_header, setIsContentVisible_header] = useState(true);
    const [isTextVisible_header, setIsTextVisible_header] = useState(true);
    const [imagePreview_header, setImagePreview_header] = useState(null);
    const [selectedFileName_header, setSelectedFileName_header] = useState("");
    const [titleText_header, setTitleText_header] = useState("Pondok Pesantren Modern Darur Rosyid");
    const [subtitleText_header, setSubtitleText_header] = useState("Ini adalah teks di atas gambar yang ditengahkan.");
    const fileInputRef_header = useRef(null);

    const handleImageUpload_header = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("File harus berupa gambar (jpg, png, dll).");
                return;
            }

            setImagePreview_header(URL.createObjectURL(file));
            setSelectedFileName_header(file.name);
        }
    };

    const handleSave_header = () => {
        alert("Data berhasil disimpan (dummy).");
    };

    const [initialData, setInitialData] = useState({
        isContentVisible: true,
        isTextVisible: true,
        title: "Pondok Pesantren Modern Darur Rosyid",
        subtitle: "Ini adalah teks di atas gambar yang ditengahkan.",
        image: null
    });

    const isChanged_header = () => {
        return (
            titleText_header !== initialData.title ||
            subtitleText_header !== initialData.subtitle ||
            imagePreview_header !== initialData.image ||
            isContentVisible_header !== true || 
            isTextVisible_header !== true
        );
    };

    const handleCancel_header = () => {
        setTitleText_header(initialData.title);
        setSubtitleText_header(initialData.subtitle);
        setImagePreview_header(initialData.image);
        setSelectedFileName_header("");
        setIsContentVisible_header(initialData.isContentVisible);
        setIsTextVisible_header(initialData.isTextVisible);

        if (fileInputRef_header.current) {
            fileInputRef_header.current.value = "";
        }
    };
    // end header
    // ======= start modal
    const [showModal_add_academic, setShowModal_add_academic] = useState(false);
    const [showModal_edit_academic, setShowModal_edit_academic] = useState(false);
    const [showModal_delete_academic, setShowModal_delete_academic] = useState(false);
    const [titleInput_add_academic, setTitleInput_add_academic] = useState("");
    const [paragraphInput_add_academic, setParagraphInput_add_academic] = useState("");

    const [showModal_add_fact, setShowModal_add_fact] = useState(false);
    const [showModal_edit_fact, setShowModal_edit_fact] = useState(false);
    const [showModal_delete_fact, setShowModal_delete_fact] = useState(false);
    const [titleInput_add_fact, setTitleInput_add_fact] = useState("");
    const [paragraphInput_add_fact, setParagraphInput_add_fact] = useState("");

    const [showModal_add_facility, setShowModal_add_facility] = useState(false);
    const [showModal_edit_facility, setShowModal_edit_facility] = useState(false);
    const [showModal_delete_facility, setShowModal_delete_facility] = useState(false);
    const [titleInput_add_facility, setTitleInput_add_facility] = useState("");
    const [paragraphInput_add_facility, setParagraphInput_add_facility] = useState("");
    const [imageFile_add_facility, setImageFile_add_facility] = useState(null);
    const [titleInput_edit_facility, setTitleInput_edit_facility] = useState("");
    const [imagePreview_edit_facility, setImagePreview_edit_facility] = useState(null);

    const handleImageUpload_add_facility = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar (jpg, png, webp, dll).");
            return;
        }

        setImageFile_add_facility(file);
        setImagePreview_edit_facility(URL.createObjectURL(file));
    };
    const handleOpenEditModal = (facility) => {
        setTitleInput_edit_facility(facility.title);
        setImagePreview_edit_facility(facility.image); // URL atau path lama
        setImageFile_add_facility(null); // reset agar bisa ganti gambar
        setShowModal_edit_facility(true);
    };
    // ======= end modal


    return(
        <section className="section-admin-index">
            <div className="container-admin-index">
                <div className="container-admin-index-title">
                    <h2>Halaman Utama</h2>
                </div>
                {/* ===== start header ===== */}
                <div className="container-admin-index-header">
                    <div className="container-admin-index-header-left">
                        <div className="container-admin-index-header-left-title">
                            <h3>Tampilan Halaman</h3>
                        </div>
                        {isContentVisible_header && (
                        <div className="container-admin-index-header-left-image">
                            <img src={imagePreview_header || "/images/index/dummy-pict.webp"} alt="" />
                            {isTextVisible_header && (
                                <div className="container-admin-index-header-left-image-text-overlay">
                                    <h5>{titleText_header}</h5>
                                    <span>{subtitleText_header}</span>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                    <div className="container-admin-index-header-right">
                        <div className="container-admin-index-header-right-title">
                            <h3>Edit Halaman</h3>
                        </div>
                        {/* TOGGLE: Visibilitas Konten */}
                        <div className="container-admin-index-header-right-control-panel">
                            <div className="container-admin-index-header-right-control-panel-togle-menu">
                                <span>Visibilitas konten :</span>
                                <label className="admin-index-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={isContentVisible_header}
                                    onChange={() => setIsContentVisible_header(!isContentVisible_header)}
                                />
                                <span className="admin-index-slider" />
                                </label>
                            </div>

                            {/* TOGGLE: Visibilitas Text */}
                            <div className="container-admin-index-header-right-control-panel-togle-menu">
                                <span>Visibilitas Teks konten :</span>
                                <label className="admin-index-toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={isTextVisible_header}
                                    onChange={() => setIsTextVisible_header(!isTextVisible_header)}
                                />
                                <span className="admin-index-slider" />
                                </label>
                            </div>

                            {/* INPUT: Upload Gambar */}
                            <div className="container-admin-index-header-right-control-panel-upload-image">
                                <span>Ubah Gambar :</span>
                                
                                <label className="custom-file-upload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload_header}
                                        ref={fileInputRef_header}
                                    />
                                    Pilih Gambar
                                </label>

                                {selectedFileName_header && (
                                    <span className="file-name">({selectedFileName_header})</span>
                                )}
                            </div>
                            {/* INPUT: title */}
                            <div className="container-admin-index-header-right-control-panel-text-input">
                                <label>
                                    Judul:
                                    <input
                                        type="text"
                                        value={titleText_header}
                                        onChange={(e) => setTitleText_header(e.target.value)}
                                        placeholder="Masukkan judul..."
                                    />
                                </label>

                                <label>
                                    Sub Judul:
                                    <input
                                        type="text"
                                        value={subtitleText_header}
                                        onChange={(e) => setSubtitleText_header(e.target.value)}
                                        placeholder="Masukkan subjudul..."
                                    />
                                </label>
                            </div>
                            {isChanged_header() && (
                                <div className="container-admin-index-header-right-control-panel-button">
                                    <button className="btn-cancel" onClick={handleCancel_header}>Batal</button>
                                    <button className="btn-save" onClick={handleSave_header}>Simpan</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* ===== end header ===== */}
                {/* ===== start academic ===== */}
                <div className="container-admin-index-academic">
                    <div className="container-admin-index-academic-title">
                        <div className="admin-index-academic-title-left">
                            <h3>Akademik</h3>
                        </div>
                        <div className="admin-index-academic-title-right">
                            <button className='btn-add-admin-index' onClick={() => setShowModal_add_academic(true)}>Tambah Kolom</button>
                        </div>
                    </div>
                    <div className="admin-index-academic-divider"></div>
                    <div className="admin-index-academic-wraper-content">
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <h4>Judul Akademik 1</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi aut beatae nobis aspernatur inventore in minima? Impedit consequuntur optio debitis velit quae, odit earum laudantium minus deserunt eius deleniti laborum!</p>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index' onClick={() => setShowModal_edit_academic(true)}>Edit</button>
                                <button className='btn-delete-admin-index' onClick={() => setShowModal_delete_academic(true)}>Hapus</button>
                            </div>
                        </div>
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <h4>Judul Akademik 1</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi aut beatae nobis aspernatur inventore in minima? Impedit consequuntur optio debitis velit quae, odit earum laudantium minus deserunt eius deleniti laborum!</p>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index'>Edit</button>
                                <button className='btn-delete-admin-index'>Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div className="admin-index-academic-bottom"></div>
                </div>
                {/* ===== end academic ===== */}
                {/* ===== start fact ===== */}
                <div className="container-admin-index-academic">
                    <div className="container-admin-index-academic-title">
                        <div className="admin-index-academic-title-left">
                            <h3>Fakta Pasantren</h3>
                        </div>
                        <div className="admin-index-academic-title-right">
                            <button className='btn-add-admin-index' onClick={() => setShowModal_add_fact(true)}>Tambah Kolom</button>
                        </div>
                    </div>
                    <div className="admin-index-academic-divider"></div>
                    <div className="admin-index-academic-wraper-content">
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <h4>Jumlah Mengajar</h4>
                                <p>1000</p>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index' onClick={() => setShowModal_edit_fact(true)}>Edit</button>
                                <button className='btn-delete-admin-index' onClick={() => setShowModal_delete_fact(true)}>Hapus</button>
                            </div>
                        </div>
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <h4>Jumlah Mengajar</h4>
                                <p>1000</p>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index'>Edit</button>
                                <button className='btn-delete-admin-index'>Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div className="admin-index-academic-bottom"></div>
                </div>
                {/* ===== end fact ===== */}
                {/* ===== start facility ===== */}
                <div className="container-admin-index-academic">
                    <div className="container-admin-index-academic-title">
                        <div className="admin-index-academic-title-left">
                            <h3>Fasilitas Pesantren</h3>
                        </div>
                        <div className="admin-index-academic-title-right">
                            <button className='btn-add-admin-index' onClick={() => setShowModal_add_facility(true)}>Tambah Kolom</button>
                        </div>
                    </div>
                    <div className="admin-index-academic-divider"></div>
                    <div className="admin-index-academic-wraper-content">
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <div className="admin-index-academic-content-left-image-wrapper">
                                    <div className="admin-index-academic-content-left-image">
                                        <img src="/images/index/dummy-pict.webp" alt="" />
                                        <div className="admin-index-academic-content-left-image-caption-bottom">
                                            <span>Asrama Nyaman</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index' onClick={() => setShowModal_edit_facility(true)}>Edit</button>
                                <button className='btn-delete-admin-index' onClick={() => setShowModal_delete_facility(true)}>Hapus</button>
                            </div>
                        </div>
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <div className="admin-index-academic-content-left-image-wrapper">
                                    <div className="admin-index-academic-content-left-image">
                                        <img src="/images/index/dummy-pict.webp" alt="" />
                                        <div className="admin-index-academic-content-left-image-caption-bottom">
                                            <span>Asrama Nyaman</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index'>Edit</button>
                                <button className='btn-delete-admin-index'>Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div className="admin-index-academic-bottom"></div>
                </div>
                {/* ===== end facility ===== */}
                {/* ===== start living ===== */}
                <div className="container-admin-index-academic">
                    <div className="container-admin-index-academic-title">
                        <div className="admin-index-academic-title-left">
                            <h3>Kehidupan Pesantren</h3>
                        </div>
                        <div className="admin-index-academic-title-right">
                            <button className='btn-add-admin-index' onClick={() => setShowModal_add_facility(true)}>Tambah Kolom</button>
                        </div>
                    </div>
                    <div className="admin-index-academic-divider"></div>
                    <div className="admin-index-academic-wraper-content">
                        <div className="admin-index-academic-content">
                            <div className="admin-index-academic-content-left">
                                <div className="admin-index-academic-content-left-image-wrapper-flex">
                                    <div className="admin-index-academic-content-left-image-wrapper-left">
                                        <img src="/images/index/dummy-pict.webp" alt="" />
                                    </div>
                                    <div className="admin-index-academic-content-left-image-wrapper-right">
                                        <h4>hello</h4>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptatum, quas laborum non et similique ratione error magni porro aliquid labore minima assumenda, pariatur corporis mollitia, nobis iste quam repellat.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-index-academic-content-right">
                                <button className='btn-edit-admin-index' onClick={() => setShowModal_edit_facility(true)}>Edit</button>
                                <button className='btn-delete-admin-index' onClick={() => setShowModal_delete_facility(true)}>Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div className="admin-index-academic-bottom"></div>
                </div>
                {/* ===== end living ===== */}
            </div>
            {/* =========== start modal ============ */}
            {/* Modal */}
            {/* ==== start add academic ==== */}
            {showModal_add_academic && (
                <div className="admin-index-modal-overlay-add-academic">
                    <div className="admin-index-modal-content-add-academic">
                        <h3>Tambah Data Akademik</h3>

                        <div className="admin-index-modal-form-add-academic">
                            <label>
                                Judul:
                                <input
                                    type="text"
                                    value={titleInput_add_academic}
                                    onChange={(e) => setTitleInput_add_academic(e.target.value)}
                                    placeholder='Judul'
                                />
                            </label>

                            <label>
                                Deskripsi:
                                <textarea
                                    rows="4"
                                    value={paragraphInput_add_academic}
                                    onChange={(e) => setParagraphInput_add_academic(e.target.value)}
                                    placeholder='Deskripsi'
                                />
                            </label>
                        </div>

                        <div className="admin-index-modal-actions-add-academic">
                            <button
                                onClick={() => setShowModal_add_academic(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button className="btn-confirm">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end add academic ==== */}
            {/* ==== start edit academic ==== */}
            {showModal_edit_academic && (
                <div className="admin-index-modal-overlay-add-academic">
                    <div className="admin-index-modal-content-add-academic">
                        <h3>Edit Data Akademik</h3>

                        <div className="admin-index-modal-form-add-academic">
                            <label>
                                Judul:
                                <input
                                    type="text"
                                    value={titleInput_add_academic}
                                    onChange={(e) => setTitleInput_add_academic(e.target.value)}
                                    placeholder='Judul'
                                />
                            </label>

                            <label>
                                Deskripsi:
                                <textarea
                                    rows="4"
                                    value={paragraphInput_add_academic}
                                    onChange={(e) => setParagraphInput_add_academic(e.target.value)}
                                    placeholder='Deskripsi'
                                />
                            </label>
                        </div>

                        <div className="admin-index-modal-actions-add-academic">
                            <button
                                onClick={() => setShowModal_edit_academic(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button className="btn-confirm">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end edit academic ==== */}
            {/* ==== start delete academic ==== */}
            {showModal_delete_academic && (
                <div className="modal-overlay-delete-academic">
                    <div className="modal-content-delete-academic">
                        <div className="icon-delete-warning">
                            <FaTrash />
                        </div>
                        <h4>Hapus Data Akademik</h4>
                        <p>Yakin ingin menghapus data ini?</p>

                        <div className="modal-actions-delete-academic">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowModal_delete_academic(false)}
                            >
                                Tidak
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => {
                                    setShowModal_delete_academic(false);
                                }}
                            >
                                Ya
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end delete academic ==== */}

            {/* ==== start add fact ==== */}
            {showModal_add_fact && (
                <div className="admin-index-modal-overlay-add-academic">
                    <div className="admin-index-modal-content-add-academic">
                        <h3>Tambah Data Fakta Pasantren</h3>

                        <div className="admin-index-modal-form-add-academic">
                            <label>
                                Judul:
                                <input
                                    type="text"
                                    value={titleInput_add_fact}
                                    onChange={(e) => setTitleInput_add_fact(e.target.value)}
                                    placeholder='Judul'
                                />
                            </label>

                            <label>
                                Total:
                                <input
                                    type="text"
                                    value={paragraphInput_add_fact}
                                    onChange={(e) => setParagraphInput_add_fact(e.target.value)}
                                    placeholder='Total'
                                />
                            </label>
                        </div>

                        <div className="admin-index-modal-actions-add-academic">
                            <button
                                onClick={() => setShowModal_add_fact(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button className="btn-confirm">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end add fact ==== */}
            {/* ==== start add fact ==== */}
            {showModal_edit_fact && (
                <div className="admin-index-modal-overlay-add-academic">
                    <div className="admin-index-modal-content-add-academic">
                        <h3>Edit Data Fakta Pasantren</h3>

                        <div className="admin-index-modal-form-add-academic">
                            <label>
                                Judul:
                                <input
                                    type="text"
                                    value={titleInput_add_fact}
                                    onChange={(e) => setTitleInput_add_fact(e.target.value)}
                                    placeholder='Judul'
                                />
                            </label>

                            <label>
                                Total:
                                <input
                                    type="text"
                                    value={paragraphInput_add_fact}
                                    onChange={(e) => setParagraphInput_add_fact(e.target.value)}
                                    placeholder='Total'
                                />
                            </label>
                        </div>

                        <div className="admin-index-modal-actions-add-academic">
                            <button
                                onClick={() => setShowModal_edit_fact(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button className="btn-confirm">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end add fact ==== */}
            {/* ==== start delete fact ==== */}
            {showModal_delete_fact && (
                <div className="modal-overlay-delete-academic">
                    <div className="modal-content-delete-academic">
                        <div className="icon-delete-warning">
                            <FaTrash />
                        </div>
                        <h4>Hapus Data Fakta Pasantren</h4>
                        <p>Yakin ingin menghapus data ini?</p>

                        <div className="modal-actions-delete-academic">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowModal_delete_fact(false)}
                            >
                                Tidak
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => {
                                    setShowModal_delete_fact(false);
                                }}
                            >
                                Ya
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end delete fact ==== */}
            {/* ==== start add facility ==== */}
            {showModal_add_facility && (
                <div className="admin-index-modal-overlay-add-academic">
                    <div className="admin-index-modal-content-add-academic">
                        <h3>Tambah Data</h3>

                        <div className="admin-index-modal-form-add-academic">
                            <label>
                                Gambar:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload_add_facility}
                                />
                            </label>

                            <label>
                                Judul:
                                <input
                                    type="text"
                                    placeholder="Judul"
                                />
                            </label>
                        </div>

                        <div className="admin-index-modal-actions-add-academic">
                            <button
                                onClick={() => setShowModal_add_facility(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button className="btn-confirm">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end add facility ==== */}
            {/* ==== start edit facility ==== */}
            {showModal_edit_facility && (
                <div className="admin-index-modal-overlay-add-academic">
                    <div className="admin-index-modal-content-add-academic">
                        <h3>Edit Data</h3>

                        <div className="admin-index-modal-form-add-academic">
                            <label>
                                Gambar:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload_add_facility}
                                />
                            </label>

                            {imagePreview_edit_facility && (
                                <img
                                    src={imagePreview_edit_facility}
                                    alt="Preview"
                                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "8px", borderRadius: "6px" }}
                                />
                            )}

                            <label>
                                Judul:
                                <input
                                    type="text"
                                    value={titleInput_edit_facility}
                                    onChange={(e) => setTitleInput_edit_facility(e.target.value)}
                                    placeholder="Judul"
                                />
                            </label>
                        </div>

                        <div className="admin-index-modal-actions-add-academic">
                            <button
                                onClick={() => setShowModal_edit_facility(false)}
                                className="btn-cancel"
                            >
                                Batal
                            </button>
                            <button
                                className="btn-confirm"
                                onClick={() => {
                                    // TODO: simpan perubahan
                                    console.log("Edit:", {
                                        title: titleInput_edit_facility,
                                        image: imageFile_add_facility || imagePreview_edit_facility
                                    });
                                    setShowModal_edit_facility(false);
                                }}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end edit facility ==== */}
            {/* ==== start delete facility ==== */}
            {showModal_delete_facility && (
                <div className="modal-overlay-delete-academic">
                    <div className="modal-content-delete-academic">
                        <div className="icon-delete-warning">
                            <FaTrash />
                        </div>
                        <h4>Hapus Data Fasilitas Pasantren</h4>
                        <p>Yakin ingin menghapus data ini?</p>

                        <div className="modal-actions-delete-academic">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowModal_delete_facility(false)}
                            >
                                Tidak
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => {
                                    setShowModal_delete_facility(false);
                                }}
                            >
                                Ya
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==== end delete facility ==== */}
            {/* =========== end modal ============ */}
        </section>
    );
}

export default Admin_Index;