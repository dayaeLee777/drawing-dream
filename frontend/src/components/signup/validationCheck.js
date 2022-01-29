import { idCheck } from "api/user";

// 유효성 검사
const validationCheck = (
  e,
  inputs,
  setInputs,
  valids,
  setValids,
  errors,
  setErrors
) => {
  let { value, name } = e.target;

  const { password } = inputs;

  if (name === "userId") {
    const regType1 = /^[a-z0-9+]*$/;
    if (value.length < 6) {
      setValids({
        ...valids,
        validId: false,
      });
      setErrors({
        ...errors,
        idErrMsg: "6자리 이상 입력해주세요.",
      });
    } else if (!regType1.test(value)) {
      setValids({
        ...valids,
        validId: false,
      });
      setErrors({
        ...errors,
        idErrMsg: "알파벳 소문자와 숫자만 사용가능합니다.",
      });
    }
    // id 중복 검사
    else if (value.length >= 6) {
      idCheck(value)
        .then(() => {
          setValids({
            ...valids,
            validId: true,
          });
          setErrors({
            ...errors,
            idErrMsg: "사용가능한 아이디입니다.",
          });
        })
        .catch((error) => {
          // console.warn = console.error = () => {};
          setValids({
            ...valids,
            validId: false,
          });
          setErrors({
            ...errors,
            idErrMsg: "이미 사용중인 아이디입니다.",
          });
        });
    }
  } else if (name === "userName") {
    const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    const regExp2 = /[ㄱ-ㅎㅏ-ㅣ]/g;

    if (!regExp.test(value) || regExp2.test(value)) {
      setValids({
        ...valids,
        validName: false,
      });
      setErrors({
        ...errors,
        nameErrMsg: "이름을 정확히 입력해 주세요.",
      });
    } else {
      setValids({
        ...valids,
        validName: true,
      });
      setErrors({
        ...errors,
        nameErrMsg: "",
      });
    }
  } else if (name === "password") {
    if (value.length < 8) {
      setValids({
        ...valids,
        validPassword: false,
      });
      setErrors({
        ...errors,
        passwordErrMsg: "8자리 이상 입력하세요.",
      });
    } else if (value.length > 20) {
      setValids({
        ...valids,
        validPassword: false,
      });
      setErrors({
        ...errors,
        passwordErrMsg: "20자리 이하로 입력하세요.",
      });
    } else {
      setValids({
        ...valids,
        validPassword: true,
      });
      setErrors({
        ...errors,
        passwordErrMsg: "",
      });
    }
    const regExp = /\s/gi;
    value = value.replace(regExp, "");
  } else if (name === "passwordConfirm") {
    if (password === value) {
      setValids({
        ...valids,
        equelPassword: true,
      });
      setErrors({
        ...errors,
        equelPasswordErrMsg: "",
      });
    } else {
      setValids({
        ...valids,
        equelPassword: false,
      });
      setErrors({
        ...errors,
        equelPasswordErrMsg: "비밀번호가 일치하지 않습니다.",
      });
    }
  } else if (name === "phoneNumber" || name === "parentPhoneNumber") {
    const regType1 = /[^0-9]/;
    value = value.replace(regType1, "");
  } else if (name === "email") {
    const regExp =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (regExp.test(value)) {
      setValids({
        ...valids,
        validEmail: true,
      });
      setErrors({
        ...errors,
        emailErrMsg: "",
      });
    } else {
      setValids({
        ...valids,
        validEmail: false,
      });
      setErrors({
        ...errors,
        emailErrMsg: "이메일형식이 올바르지 않습니다.",
      });
    }
  } else if (name === "studentNo") {
    const regType1 = /[^0-9]/;
    value = value.replace(regType1, "");
  }
  setInputs({
    ...inputs,
    [name]: value,
  });
};
// 유효성 검사 END

export default validationCheck;
