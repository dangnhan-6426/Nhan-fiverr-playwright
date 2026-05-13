// ===== ERROR MESSAGES =====
export const ERROR_MESSAGES = {
  // ===== Email =====
  email: {
    empty: "Email không được bỏ trống !",
    emptyAlt: "Email không được bỏ trống",
    invalidFormat: "Email không đúng định dạng !",
    invalidFormatAlt: "Email không đúng định dạng",
    alreadyExists: "Email đã tồn tại !",
    wrongEmailOrPassword: "Email hoặc mật khẩu không đúng !",
  },

  // ===== Password =====
  password: {
    empty: "Password không được bỏ trống !",
    emptyAlt: "Password không được bỏ trống",
    characterLimit: "pass từ 6 - 32 ký tự !",
    characterLimitAlt: "Password từ 6 - 32 ký tự",
  },

  // ===== Confirm Password =====
  confirmPassword: {
    empty: "PasswordConfirm không được bỏ trống",
    mismatch: "Password phải trùng nhau",
  },

  // ===== Name =====
  name: {
    empty: "Name không được bỏ trống",
    alreadyExists: "Tên người dùng đã tồn tại !",
  },

  // ===== Phone =====
  phone: {
    empty: "Phone không được bỏ trống",
    invalidFormat: "Phone phải từ 03 05 07 08 09 và có 10 số",
    alreadyExists: "Phone đã được đăng ký!",
  },

  // ===== Birthday =====
  birthday: {
    empty: "Birthday không được bỏ trống",
  },
} as const;

// ===== SUCCESS MESSAGES =====
export const SUCCESS_MESSAGES = {
  // ===== Auth =====
  auth: {
    login: "Đăng nhập tài khoản thành công !",
    register: "Đăng kí tài khoản thành công !",
    loginRequired: "Yêu cầu đăng nhập !",
  },

  // ===== Profile =====
  profile: {
    update: "Cập nhật thông tin thành công !",
  },

  // ===== Job =====
  job: {
    rent: "Thuê công việc thành công !",
  },

  // ===== Admin =====
  admin: {
    createAccount: "Thêm quản trị thành công !",
    delete: "Xóa thành công",
  },
} as const;

