import styled from "styled-components";

const Main = (props) => {
  return (
    <Container>
      <Sharebox>
        Share
        <div>
          <img src="/images/user.svg" alt=" " />
          <button> Start a post </button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span> Photo </span>
          </button>

          <button>
            <img src="/images/video-icon.png" alt="" />
            <span> Video </span>
          </button>

          <button>
            <img src="/images/event-icon.png" alt="" />
            <span> Event </span>
          </button>

          <button>
            <img src="/images/article-icon.png" alt="" />
            <span> Write an article </span>
          </button>
        </div>
      </Sharebox>
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  boxshadow: 0 0 0 1px rgb(0 0 0 / 15%), rgb(0 0 0 / 20%);
`;

const Sharebox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center; // I adjusted this to center align, since the previous value seemed incorrect.
      padding: 8px 16px; // Use padding for spacing around items

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:not(:first-child) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }
  }
`;

export default Main;
