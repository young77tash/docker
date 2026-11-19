import { useState } from "react";

interface Product {
  id: number;
  name: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  function saveProduct() {
    if (!name.trim()) return;

    if (editId !== null) {
      setProducts(
        products.map((product) =>
          product.id === editId ? { ...product, name } : product,
        ),
      );
      setEditId(null);
    } else {
      setProducts([...products, { id: Date.now(), name }]);
    }

    setName("");
  }

  function editProduct(product: Product) {
    setName(product.name);
    setEditId(product.id);
  }

  function deleteProduct(id: number) {
    setProducts(products.filter((product) => product.id !== id));

    if (editId === id) {
      setEditId(null);
      setName("");
    }
  }

  return (
    <div className="min-h-screen bg-[#242424] text-gray-200 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">Список покупок</h1>

        <p className="text-gray-400 mb-8">
          Додавайте та керуйте своїми покупками
        </p>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Назва товару"
            className="flex-1 min-w-0 bg-[#333] border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-gray-400"
          />

          <button
            onClick={saveProduct}
            className="bg-gray-200 text-gray-900 px-5 rounded-md hover:bg-white cursor-pointer"
          >
            {editId !== null ? "Зберегти" : "Додати"}
          </button>
        </div>

        <h2 className="text-lg font-medium mb-4">
          Мої покупки ({products.length})
        </h2>

        {products.length === 0 && (
          <p className="text-gray-500">Список покупок порожній</p>
        )}

        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 bg-[#303030] rounded-md px-4 py-3"
            >
              <span className="break-all">{product.name}</span>

              <div className="flex gap-4 shrink-0">
                <button
                  onClick={() => editProduct(product)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Змінити
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
