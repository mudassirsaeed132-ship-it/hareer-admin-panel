function deepClone(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function pad(number, size = 2) {
  return String(number).padStart(size, "0");
}

function createSequentialId(prefix, existingItems = []) {
  const matching = existingItems
    .map((item) => String(item?.id || ""))
    .filter((id) => id.startsWith(prefix));

  const maxIndex = matching.reduce((max, id) => {
    const suffix = id.slice(prefix.length);
    const parsed = Number.parseInt(suffix, 10);
    return Number.isFinite(parsed) ? Math.max(max, parsed) : max;
  }, 0);

  return `${prefix}${pad(maxIndex + 1)}`;
}

export function createMockCrudStore(initialItems = [], { idPrefix = "item-" } = {}) {
  let items = deepClone(Array.isArray(initialItems) ? initialItems : []);

  function list() {
    return deepClone(items);
  }

  function getById(id) {
    const item = items.find((entry) => entry?.id === id) ?? null;
    return deepClone(item);
  }

  function create(payload) {
    const now = Date.now();
    const created = {
      ...deepClone(payload ?? {}),
      id: createSequentialId(idPrefix, items),
      createdAt: now,
      updatedAt: now,
    };

    items = [created, ...items];
    return deepClone(created);
  }

  function update(id, payload) {
    const index = items.findIndex((entry) => entry?.id === id);

    if (index < 0) {
      throw new Error("Record not found");
    }

    const updated = {
      ...items[index],
      ...deepClone(payload ?? {}),
      id,
      updatedAt: Date.now(),
    };

    items = [...items.slice(0, index), updated, ...items.slice(index + 1)];
    return deepClone(updated);
  }

  function remove(id) {
    const exists = items.some((entry) => entry?.id === id);
    items = items.filter((entry) => entry?.id !== id);
    return exists;
  }

  function setAll(nextItems) {
    items = deepClone(Array.isArray(nextItems) ? nextItems : []);
  }

  return {
    list,
    getById,
    create,
    update,
    remove,
    setAll,
  };
}

export { deepClone };
