import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
`;

export const Header = styled.header`
  height: 80px;
  background: #444;
  padding: 16px 24px;
  color: white;
`;

export const Main = styled.main`
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  button {
    padding: 10px;
    border: none;
    background: #555;
    color: white;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    transition: background 0.2s ease;
    text-transform: uppercase;

    &:hover {
      background: #444;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 300px;
    row-gap: 8px;

    h4 {
      align-self: center;
      font-size: 18px;
    }

    input {
      padding: 8px;
      border: 1px solid #555;
      border-radius: 4px;
      outline: none;
    }

    div {
      display: flex;
      justify-content: space-between;

      button:nth-of-type(2) {
        background: #2980b9;

        &:hover {
          background: #2471a3;
        }

        &:disabled {
          background: #2980b9 !important;
          opacity: 0.8;
          cursor: initial;
        }
      }
    }
  }

  ul {
    align-self: center;
    list-style: none;
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    row-gap: 6px;

    li {
      border: 1px solid #555;
      padding: 8px 14px;

      div {
        margin: 0 auto;
        margin-top: 8px;
        width: 60%;
        display: flex;
        justify-content: space-around;

        button {
        }
      }
    }
  }
`;
