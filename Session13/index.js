// Dữ liệu ban đầu
let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];

// 1. Hiển thị danh sách đơn đặt vé
function displayBookings(bookings) {
  // Kiểm tra nếu danh sách trống
  if (!bookings || bookings.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let totalRevenue = 0;
  // Logic để xử lý khi mảng có phần tử
  bookings.forEach((element, index) => {
    // Cộng dồn giá tiền
    totalRevenue += element.totalAmount;

    console.log(
      `${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle}
        SL: ${element.ticketCount}| Giá: ${element.pricePerTicket} | Tổng TT: ${element.totalAmount}
      `,
    );
  });

  // Tính tổng số lượng vé và doanh thu
  console.log(
    `Tổng vé: ${bookings.length} đơn đặt vé - Doanh thu: ${totalRevenue}`,
  );
}

// Hàm format tên
function formatName(name) {
  if (!name) {
    return "";
  }

  //   Loại bỏ khoảng trắng ở đầu và cuối
  let trimed = name.trim();

  //  Biến đổi chuỗi thành mảng và truy cập vào từng phần tử trong mảng và biến đổi ký tự đầu thành in hoa
  let words = trimed.split(" ");

  //   Dùng map() để biến đổi
  let capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  //   Biến đổi mảng thành chuỗi
  return capitalizeWords.join(" ");
}

// Kiểm tra xem mã đã tồn tại chưa
function findBookingIndex(bookingCode) {
  if (!bookingCode) {
    return -1;
  }

  //   Biến đổi mã thành in hoa
  let targetBookingCode = bookingCode.trim().toUpperCase();

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === targetBookingCode) {
      return i;
    }
  }

  return -1;
}

// Hàm kiểm tra mã đặt đặt vé
function validateBookingCode(bookingCode) {
  if (bookingCode === null) {
    return "Hủy thao tác";
  }

  if (bookingCode === "") {
    return "Lỗi: chưa nhập mã đặt vé";
  }

  //   Biến đổi mã thành in hoa
  let upperCode = bookingCode.trim().toUpperCase();

  if (upperCode.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }

  if (!upperCode.startsWith("CIN-")) {
    return "Lỗi: Mã không hợp lệ";
  }

  if (findBookingIndex(upperCode) !== -1) {
    return "Lỗi: Mã đã tồn tại";
  }

  return "";
}

// 2. Thêm đơn đặt vé mới
function handleCreateBooking() {
  let bookingCode = prompt("Nhập mã đặt vé: ");

  if (bookingCode === null) {
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();

  let codeError = validateBookingCode(bookingCode);

  if (codeError !== "") {
    alert(codeError);
    return;
  }

  let customerName = prompt("Nhập tên khách hàng: ");

  if (customerName === null) {
    return;
  }

  customerName = formatName(customerName);

  if (customerName === "") {
    alert("Tên khách hàng không được để trống");
    return;
  }

  let movieTitle = prompt("Nhập tên phim: ");

  if (movieTitle === null) {
    return;
  }

  movieTitle = movieTitle.trim();

  if (movieTitle === "") {
    alert("Tên phim khồng đươc để trống");
    return;
  }

  let ticketCount = +prompt("Nhập số lượng vé: ");

  if (ticketCount === null || ticketCount === undefined) {
    return;
  }

  let pricePerTicket = +prompt("Nhập giá vé: ");

  if (pricePerTicket === null || pricePerTicket === undefined) {
    return;
  }

  let totalAmount = ticketCount * pricePerTicket * 0.9;

  let newBooking = {
    bookingCode,
    customerName,
    movieTitle,
    ticketCount,
    pricePerTicket,
    totalAmount,
  };

  bookings.push(newBooking);

  alert("Thêm đơn đặt vé mới thành công");
  console.log("Đơn đặt vé thừa thêm: ", newBooking);
}
// 3. Cập nhật đơn đặt vé
function handleUpdateBooking() {
  let bookingCode = prompt("Nhập mã đơn đặt vé cần cập nhật: ");

  if (bookingCode === null) {
    return;
  }

  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    alert("Không tìm thấy đơn đặt vé với mã: " + bookingCode.trim().toUpperCase());
    return;
  }

  let booking = bookings[index];

  let newCustomerName = prompt(
    `Nhập tên khách hàng mới (hiện tại: ${booking.customerName}):`,
  );

  if (newCustomerName === null) {
    return;
  }

  newCustomerName = formatName(newCustomerName);

  if (newCustomerName === "") {
    alert("Tên khách hàng không được để trống");
    return;
  }

  let newMovieTitle = prompt(
    `Nhập tên phim mới (hiện tại: ${booking.movieTitle}):`,
  );

  if (newMovieTitle === null) {
    return;
  }

  newMovieTitle = newMovieTitle.trim();

  if (newMovieTitle === "") {
    alert("Tên phim không được để trống");
    return;
  }

  let newTicketCount = +prompt(
    `Nhập số lượng vé mới (hiện tại: ${booking.ticketCount}):`,
  );

  if (isNaN(newTicketCount) || newTicketCount <= 0) {
    alert("Số lượng vé không hợp lệ");
    return;
  }

  let newPricePerTicket = +prompt(
    `Nhập giá vé mới (hiện tại: ${booking.pricePerTicket}):`,
  );

  if (isNaN(newPricePerTicket) || newPricePerTicket <= 0) {
    alert("Giá vé không hợp lệ");
    return;
  }

  let newTotalAmount = newTicketCount * newPricePerTicket * 0.9;

  bookings[index].customerName = newCustomerName;
  bookings[index].movieTitle = newMovieTitle;
  bookings[index].ticketCount = newTicketCount;
  bookings[index].pricePerTicket = newPricePerTicket;
  bookings[index].totalAmount = newTotalAmount;

  alert("Cập nhật đơn đặt vé thành công!");
  console.log("Đơn đặt vé sau cập nhật: ", bookings[index]);
}

// 4. Xóa đơn đặt vé
function handleDeleteBooking() {
  let bookingCode = prompt("Nhập mã đơn đặt vé cần xoá: ");

  if (bookingCode === null) {
    return;
  }

  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    alert("Không tìm thấy đơn đặt vé");
    return;
  }

  let confirmDelete = confirm(
    `Bạn có chắc muốn xoá ${bookings[index].bookingCode}?`,
  );

  if (!confirmDelete) {
    alert("Huỷ thao tác xoá");
    return;
  }

  bookings.splice(index, 1);

  alert("Xoá thành công");
}

// 5. Tìm kiếm đơn đặt vé theo tên phim
function handleSearchBooking() {
  let keyword = prompt("Nhập tên phim cần tìm kiếm: ");

  if (keyword === null) {
    return;
  }

  keyword = keyword.trim();

  if (keyword === "") {
    alert("Từ khóa tìm kiếm không được để trống");
    return;
  }

  let results = bookings.filter((booking) =>
    booking.movieTitle.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (results.length === 0) {
    alert(`Không tìm thấy đơn đặt vé nào với phim: "${keyword}"`);
    return;
  }

  console.log(`Kết quả tìm kiếm cho phim "${keyword}" (${results.length} kết quả):`);
  displayBookings(results);
  alert(`Tìm thấy ${results.length} đơn đặt vé. Xem chi tiết trong Console.`);
}

// Hàm chạy chương trình
function main() {
  let choice;
  do {
    //  Dấu + sẽ có tác dụng ép kiểu dữ liệu thành number
    choice = +prompt(`
        ===================================
        HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
        ===================================
        1. Hiển thị danh sách đơn đặt vé
        2. Thêm đơn đặt vé mới
        3. Cập nhật đơn đặt vé
        4. Xóa đơn đặt vé
        5. Tìm kiếm đơn đặt vé theo tên phim
        0. Thoát chương trình
        ====================================
        Vui lòng nhập lựa chọn của bạn (0 - 5):
    `);

    switch (choice) {
      case 1:
        // 1. Hiển thị danh sách đơn đặt vé
        displayBookings(bookings);

        break;
      case 2:
        // 2. Thêm đơn đặt vé mới
        handleCreateBooking();

        break;
      case 3:
        // 3. Cập nhật đơn đặt vé"
        handleUpdateBooking();

        break;
      case 4:
        // 4. Xóa đơn đặt vé
        handleDeleteBooking();

        break;
      case 5:
        // 5. Tìm kiếm đơn đặt vé theo tên phim"
        handleSearchBooking();

        break;
      case 0:
        alert("Thoát chương trình");
        break;

      default:
        alert("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        break;
    }
  } while (choice !== 0);
}

main();
