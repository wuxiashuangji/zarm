import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import { Loading } from 'zarm';
import Format from '@site/utils/format';
import { components } from '@site/site.config';
import SentryBoundary from '@site/demo/components/SentryBoundary';
import Markdown from '@site/demo/components/Markdown';
import './style.scss';

const HAS_STYLE_COMPONENT = [
  'Badge', 'Button', 'Calendar', 'Carousel', 'Collapse',
  'Cell', 'Checkbox', 'FilePicker', 'Icon', 'Message',
  'NoticeBar', 'Panel', 'Picker', 'Popup', 'Progress',
  'Pull', 'Radio', 'SearchBar', 'Tabs', 'Toast', 'Tooltip',
  'Popper',
];

const LoadablePage = (loader) => {
  return Loadable({
    loader,
    loading: () => <Loading visible />,
  });
};

const LoadableComponent = (component) => {
  const loader = { page: component.module };

  if (HAS_STYLE_COMPONENT.indexOf(component.name) > -1) {
    loader.style = () => import(`@site/demo/styles/${component.name}Page`);
  }

  return Loadable.Map({
    loader,
    render: (loaded, props) => {
      return (
        <Markdown
          document={loaded.page.default}
          // data={{
          //   name: component.name,
          //   description: component.description,
          // }}
          className={`${Format.camel2Dash(component.name)}-page`}
          {...props}
        />
      );
    },
    loading: () => <Loading visible />,
  });
};

class App extends Component {
  render() {
    const { location } = this.props;
    const { form, feedback, view, navigation, other } = components;

    return (
      <SentryBoundary>
        <Switch key={location.pathname} location={location}>
          <Route exact path="/" component={LoadablePage(() => import('@site/demo/pages/Index'))} />
          {
            [...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
              <Route key={+i} path={`/${Format.camel2Dash(component.name)}`} component={LoadableComponent(component)} />
            ))
          }
          <Route component={LoadablePage(() => import('@site/demo/pages/NotFoundPage'))} />
        </Switch>
      </SentryBoundary>
    );
  }
}

export default hot(withRouter(App));
