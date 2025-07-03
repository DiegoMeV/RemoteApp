import { toArray } from "@/lib"

export const handleSetCurrentGroup = (arrObject, idToFind, setValue) => {
  const appInfo = toArray(arrObject?.data) // Asegura que arrObject sea un array
  const group = appInfo
    .flatMap((app) => app.groups || []) // Asegurarse de que app.groups sea un array
    .find((group) => group && group.id === idToFind) // Verificar si group existe y tiene el ID deseado
  setValue(group)
}
