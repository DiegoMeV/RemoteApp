import { render, screen, fireEvent } from "@testing-library/react";

import BasicListItem from "../BasicListItem";

test("renders a list item with icon and label", () => {
  render(<BasicListItem icon="🚀" label="Rocket" />);
  // Renderizamos el componente con las props `icon` y `label`.

  const icon = screen.getByText("🚀");
  // `screen.getByText` selecciona un elemento con el texto especificado (en este caso, el icono).

  const label = screen.getByText("Rocket");
  // `screen.getByText` selecciona un elemento con el texto especificado (en este caso, la etiqueta).

  expect(icon).toBeInTheDocument();
  // Comprobamos que el icono esté en el documento.

  expect(label).toBeInTheDocument();
  // Comprobamos que la etiqueta esté en el documento.
});

test("renders a list item without icon", () => {
  render(<BasicListItem label="Rocket" />);
  // Renderizamos el componente con la prop `label`.

  const icon = screen.queryByText("🚀");
  // `screen.queryByText` selecciona un elemento con el texto especificado (en este caso, el icono).

  expect(icon).not.toBeInTheDocument();
  // Comprobamos que el icono no esté en el documento.
});

test("renders a list item without label", () => {
  render(<BasicListItem icon="🚀" />);
  // Renderizamos el componente con la prop `icon`.

  const label = screen.queryByText("Rocket");
  // `screen.queryByText` selecciona un elemento con el texto especificado (en este caso, la etiqueta).

  expect(label).not.toBeInTheDocument();
  // Comprobamos que la etiqueta no esté en el documento.
});

test("renders a list item with click event", () => {
  const handleClick = jest.fn();
  // Creamos una función simulada para el evento de clic.

  render(<BasicListItem icon="🚀" label="Rocket" onClick={handleClick} />);
  // Renderizamos el componente con las props `icon`, `label` y `onClick`.

  const listItem = screen.getByRole("button");
  // `screen.getByRole` selecciona un elemento con el rol especificado (en este caso, el botón).

  fireEvent.click(listItem);
  // `fireEvent.click` simula el evento de clic en el botón.

  expect(handleClick).toHaveBeenCalledTimes(1);
  // Comprobamos que la función simulada se haya llamado una vez.
});
