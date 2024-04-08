import { useI18n } from 'vue-i18n';

import { ColumnType, type ColumnTypeSelectionOption } from '@/models/core';

export const getSelectableColumnTypes = () : ColumnTypeSelectionOption[] => {
  const { t } = useI18n();

  return [
    {
      name: t('number'),
      value: ColumnType.Number
    },
    {
      name: t('text'),
      value: ColumnType.Text
    },
  ];
};