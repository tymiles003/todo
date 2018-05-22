const DEFAULT_OBJECT = {
  localization: 'en',
  items: [],
  lastCount: -1,
  lastCountCategory: 0,
  selectedCategory: 0,
  categories: [
    {
      id: 0,
      name: 'default'
    }
  ]
};

const DEFAULT_OBJECT_ITEM_TIME_TRACK_ITEM = {
  startTime: 0,
  duration: 0
};

const DEFAULT_OBJECT_ITEM_TIME_PAST = {
  duration: 0,
  render: '00:00:00'
};

const DEFAULT_OBJECT_ITEM_TIME = {

  createdTime: 0,
  startTime: null,
  pastTime: DEFAULT_OBJECT_ITEM_TIME_PAST,
  track: []
};

const DEFAULT_OBJECT_ITEM = {
  id: 0,
  categoryId: 0,
  text: 'text',
  time: DEFAULT_OBJECT_ITEM_TIME,
  sort: 0,
  status: 'Pending',
  action: 'Default'
};

const DEFAULT_OBJECT_CAT = {
  id: 0,
  name: 'default'
};

const dataTemplates = {
  DEFAULT_OBJECT,
  DEFAULT_OBJECT_ITEM_TIME_TRACK_ITEM,
  DEFAULT_OBJECT_ITEM_TIME_PAST,
  DEFAULT_OBJECT_ITEM_TIME,
  DEFAULT_OBJECT_ITEM,
  DEFAULT_OBJECT_CAT
};

export default dataTemplates;
