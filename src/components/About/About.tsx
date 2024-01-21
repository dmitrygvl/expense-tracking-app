import React from 'react';
import avatar from '../../assets/img/avatar.jpg';
import './About.css';

const About = () => {
  const handleClickGithub = () => {
    window.open('https://github.com/dmitrygvl/expense-tracking-app');
  };

  return (
    <div className="_container">
      <div className="about">
        <div className="about__content content-about">
          <div className="content-about__header">
            <h2 className="content-about__header_title">About</h2>
          </div>
          <div className="content-about__body">
            <img src={avatar} alt="avatar" width="148px" height="180px" />
            <table>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>Cost management</td>
                </tr>
                <tr>
                  <td>Author:</td>
                  <td>dmitrygvl</td>
                </tr>
                <tr>
                  <td>GitHub:</td>
                  <td>
                    <span className="github" onClick={handleClickGithub}>
                      https://github.com/dmitrygvl/expense-tracking-app
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content-about__footer">
            <h3>Description</h3>
            <p>
              This application allows you to track expenses by categories that
              you need to create in advance. You can create categories, and each
              can have subcategories.
              <br />
              In each category or subcategory on a certain date you can enter
              the amount you spent. If there are expenses in a subcategory, they
              will be taken into account in the category.
              <br />
              You can also view reports for selected categories for the current
              period of time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
