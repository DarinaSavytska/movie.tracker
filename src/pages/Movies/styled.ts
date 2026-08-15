import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  z-index: 1;
  background-color: lightgray;
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ErrorText = styled.div`
  color: darkred;
`;

export const MoviesContainer = styled.div`
  position: relative;
  top: 50px;
`;

export const MoviesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
`;

export const MovieItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export const MovieTitle = styled.div`
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MovieImg = styled.img`
  width: 100%;
`;
