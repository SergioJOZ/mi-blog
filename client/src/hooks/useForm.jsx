import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
  const [formulario, setFormulario] = useState(objetoInicial);

  const serializarFormulario = (form) => {
    const formData = new FormData(form);

    const objetoCompleto = {};

    for (let [name, value] of formData) {
      objetoCompleto[name] = value;
    }

    return objetoCompleto;
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;

    setFormulario({ ...formulario, [name]: value });
  };

  const enviado = (e) => {
    e.preventDefault();

    let curso = serializarFormulario(e.target);

    setFormulario(curso);

    document.querySelector(".codigo").classList.add("enviado");
  };

  return {
    formulario,
    enviado,
    cambiado,
  };
};
