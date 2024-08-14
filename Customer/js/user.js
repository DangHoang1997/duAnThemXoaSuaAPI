
    // Hàm để lấy dữ liệu sản phẩm từ API
async function fetchProducts() {
    const response = await fetch('https://66b250181ca8ad33d4f75357.mockapi.io/APIPROJECT');
    const products = await response.json();
    return products;
}

// Hàm để hiển thị danh sách sản phẩm
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Xóa nội dung cũ

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.Img}" class="card-img-top" alt="${product.Name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.Name}</h5>
                        <p class="card-text">Giá: <span>${product.Price} VNĐ</span></p>
                        <p class="card-text">Mô tả: ${product.DECS}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.Id}', '${product.Name}', ${product.Price})">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard; // Thêm thẻ sản phẩm vào danh sách
    });
}

// Hàm thêm sản phẩm vào giỏ hàng
let cart = [];
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    updateCartUI();
    updateCartCount();
}

// Hàm cập nhật giao diện giỏ hàng
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.price} VNĐ</td>
                <td>
                    <input type="number" class="form-control" value="${item.quantity}" min="1" onchange="updateCartItem('${item.id}', this.value)">
                </td>
                <td>${(item.price * item.quantity).toLocaleString()} VNĐ</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        cartItems.innerHTML += row;
        total += item.price * item.quantity;
    });

    // Cập nhật tổng tiền trong modal
    document.getElementById('cart-total').textContent = total.toLocaleString() + ' VNĐ';
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartItem(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCartUI();
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartUI();
        updateCartCount();
    }
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng ở header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Gọi API và hiển thị sản phẩm khi trang được tải
window.onload = async () => {
    const products = await fetchProducts();
    displayProducts(products);
};
