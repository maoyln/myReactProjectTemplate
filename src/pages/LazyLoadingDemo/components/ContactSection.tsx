import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section>
      <h2>联系我们</h2>
      <form>
        <input type="text" placeholder="姓名" />
        <input type="email" placeholder="邮箱" />
        <textarea placeholder="留言"></textarea>
        <button type="submit">发送</button>
      </form>
    </section>
  );
};

export default ContactSection;
