import "./Resume.css";

export default function ProductDetails(props: any) {
  return (
    <div>
      <h1>작성자 ID:{props.params.userId}</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <br />
          <input type="text" id="title" name="title" />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <br />
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <br />
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <br />
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="introduction">간단소개</label>
          <br />
          <textarea id="introduction" name="introduction" />
        </div>
        <div className="form-group">
          <label htmlFor="experience">경력</label>
          <br />
          <textarea id="experience" name="experience" />
        </div>
        <div className="form-group">
          <label htmlFor="education">학력</label>
          <br />
          <textarea id="education" name="education" />
        </div>
        <div className="form-group">
          <label htmlFor="skills">스킬</label>
          <br />
          <textarea id="skills" name="skills" />
        </div>
        <div className="form-group">
          <label htmlFor="awards">수상</label>
          <br />
          <textarea id="awards" name="awards" />
        </div>
        <div className="form-group">
          <label htmlFor="language">외국어</label>
          <br />
          <input type="text" id="language" name="language" />
        </div>
        <div className="form-group">
          <label htmlFor="links">링크</label>
          <br />
          <input type="url" id="links" name="links" />
        </div>
      </form>
    </div>
  );
}
