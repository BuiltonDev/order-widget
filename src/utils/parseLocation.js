
export default function parseLocation(location, type) {
  if (!location || !location.address_components) return null;
  const components = location.address_components;
  for (let i = 0; i < components.length; i += 1) {
    if (components[i].types.indexOf(type) > -1) return components[i].long_name;
  }
  return null;
}
