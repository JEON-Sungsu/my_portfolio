/**
 * 프로젝트의 displayType을 반환합니다.
 * @param {Object} project - 프로젝트 데이터 객체
 * @returns {string} displayType - 'features' | 'full' | 'troubleshooting'
 */
export const getDisplayType = (project) => {
  return project?.displayType || 'troubleshooting';
};
