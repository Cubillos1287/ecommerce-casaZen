import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext"; // Importar contexto de productos
import Swal from "sweetalert2";

const ProductFormPage = () => {
    const { id } = useParams(); // Si existe id, es edición
    const navigate = useNavigate();
    const { token, user } = useContext(UserContext);
    const { getProducts } = useContext(ProductContext); // Obtener función para refrescar

    const isEditing = !!id;

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "Decoracion", // Valor por defecto
        stock: 1,
        img: ""
    });

    const [loading, setLoading] = useState(false);

    // Cargar datos si es edición
    useEffect(() => {
        if (isEditing) {
            const fetchProduct = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/productos/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        setFormData({
                            nombre: data.nombre,
                            descripcion: data.descripcion || "",
                            precio: data.precio,
                            categoria: data.categoria,
                            stock: data.stock,
                            img: data.img || ""
                        });
                    } else {
                        Swal.fire("Error", "No se pudo cargar el producto", "error");
                        navigate("/");
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "Error de conexión", "error");
                }
            };
            fetchProduct();
        }
    }, [id, isEditing, navigate]);

    // Verificar si es admin (opcional, pero buena práctica)
    useEffect(() => {
        if (!user) return; // Esperar a que cargue usuario
        // Fallback: verificar API o usar propiedad 'rol' si ya existe en el contexto actualizado
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validación simple
        if (!formData.nombre || !formData.precio || !formData.categoria) {
            Swal.fire("Atención", "Nombre, precio y categoría son obligatorios", "warning");
            setLoading(false);
            return;
        }

        const url = isEditing
            ? `http://localhost:3000/api/productos/${id}`
            : `http://localhost:3000/api/productos`;

        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: `Producto ${isEditing ? "actualizado" : "creado"}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                await getProducts(); // Refrescar lista de productos
                navigate("/"); // O a la vista del producto
            } else {
                const errorData = await res.json();
                Swal.fire("Error", errorData.message || "Hubo un error", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Error al conectar con el servidor", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page"> {/* Reusando clase contenedor */}
            <div className="profile-container">
                <h1 className="profile-header">{isEditing ? "Editar Producto" : "Crear Producto"}</h1>

                <div className="profile-card-custom" style={{ maxWidth: "600px" }}>
                    {formData.img && (
                        <div className="img-wrapper" style={{ height: "200px", marginBottom: "20px" }}>
                            <img
                                src={
                                    formData.img?.startsWith("http") || formData.img?.startsWith("data:")
                                        ? formData.img
                                        : `/imgs/${formData.img?.split('/').pop()}`
                                }
                                alt="Vista previa"
                                className="card-image"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form" style={{ width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label style={{ fontSize: "14px", fontWeight: "bold" }}>URL Imagen</label>
                            <input
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleChange}
                                className="auth-input"
                                placeholder="http://..."
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label style={{ fontSize: "14px", fontWeight: "bold" }}>Nombre del producto</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label style={{ fontSize: "14px", fontWeight: "bold" }}>Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="auth-input"
                                style={{ title: "descripcion", borderRadius: "10px", minHeight: "80px" }}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label style={{ fontSize: "14px", fontWeight: "bold" }}>Precio</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    className="auth-input"
                                    required
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label style={{ fontSize: "14px", fontWeight: "bold" }}>Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="auth-input"
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label style={{ fontSize: "14px", fontWeight: "bold" }}>Categoría</label>
                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                className="auth-input"
                                style={{ appearance: "none" }} // Reset básico
                            >
                                <option value="Decoracion">Decoración</option>
                                <option value="Cocina">Cocina</option>
                                <option value="Cuarto">Cuarto</option>
                                <option value="Baño">Baño</option>
                                <option value="Oficina">Oficina</option>
                            </select>
                        </div>

                        <button type="submit" className="cart-pay-btn" style={{ marginTop: "20px" }} disabled={loading}>
                            {loading ? "Guardando..." : "Publicar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductFormPage;
