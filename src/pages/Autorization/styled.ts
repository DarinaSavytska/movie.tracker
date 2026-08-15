import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Registration = styled.div`
  cursor: pointer;
  font-size: 14px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

export const ErrorBlock = styled.div`
  font-size: 14px;
  color: darkred;
`;
