import UserStorage from "../utils/UserStorage";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

export default class Profile {
  constructor({ $element, router }) {
    this.$element = $element;
    this.router = router;
    this.userStorage = new UserStorage();
    this.$element.innerHTML = "";

    // 로그인 상태가 아니라면 로그인 페이지로 이동
    const isLoggedIn = this.userStorage.get("name");

    if (!isLoggedIn) {
      this.router.navigateTo("/login");
      return;
    }

    this.render();
    this.updateProfile();
  }

  render() {
    const header = new Header({
      $element: this.$element,
      router: this.router,
    });

    const footer = new Footer({
      $element: this.$element,
    });

    const username = this.userStorage.get("name");
    const email = this.userStorage.get("email") || "";
    const bio = this.userStorage.get("bio") || "안녕하세요. 반가워요!";

    const main = document.createElement("main");
    main.classList.add("p-4");
    main.innerHTML = `
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
            <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" value="${username}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" value="${email}" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${bio}</textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
        </div>
      </main>
    `;

    this.$element.prepend(header.$element.querySelector("#header"));
    this.$element.append(main);
    this.$element.append(footer.$element.querySelector("#footer"));
  }

  updateProfile() {
    const form = this.$element.querySelector("#profile-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = this.$element.querySelector("#username").value;
      const email = this.$element.querySelector("#email").value;
      const bio = this.$element.querySelector("#bio").value;

      this.userStorage.set("name", name);
      this.userStorage.set("email", email);
      this.userStorage.set("bio", bio);
      alert("프로필이 업데이트 되었습니다.");
    });
  }
}
