// Import primary liquid file for template
import './index.liquid';

// Import layout used by primary liquid file
import '../../layout/main';

// Import sections used by primary liquid file
import '../../sections/blog-posts';
import '../../sections/collection-list';
import '../../sections/featured-collection';
import '../../sections/featured-product';
import '../../sections/image-with-text';
import '../../sections/newsletter';
import '../../sections/rich-text';

import {load} from '@shopify/theme-sections';

document.addEventListener('DOMContentLoaded', () => {
  load('*');
});
