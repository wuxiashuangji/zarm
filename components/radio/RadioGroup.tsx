import React, { PureComponent, cloneElement, ReactNode, isValidElement } from 'react';
import classnames from 'classnames';
import { BaseRadioGroupProps } from './PropsType';

const getChildChecked = (children: ReactNode) => {
  let checkedValue = null;
  React.Children.forEach(children, (element: ReactNode) => {
    if (isValidElement(element)
      && element.props
      && element.props.checked
    ) {
      checkedValue = element.props.value;
    }
  });
  return checkedValue;
};

const getValue = (props: RadioGroup['props'], defaultValue: null) => {
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue;
  }
  if (getChildChecked(props.children)) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

export interface RadioGroupProps extends BaseRadioGroupProps {
  prefixCls?: string;
  className?: string;
}

export interface RadioGroupStates {
  value?: string | number | null;
}

export default class RadioGroup extends PureComponent<RadioGroupProps, RadioGroupStates> {
  static displayName = 'RadioGroup';

  static defaultProps = {
    prefixCls: 'za-radio-group',
    theme: 'primary',
    shape: 'radius',
    block: false,
    disabled: false,
  };

  state: RadioGroupStates = {
    value: getValue(this.props, null),
  };

  static getDerivedStateFromProps(nextProps: RadioGroup['props']) {
    if ('value' in nextProps || getChildChecked(nextProps.children)) {
      return {
        value: nextProps.value || getChildChecked(nextProps.children),
      };
    }

    return null;
  }

  onChildChange = (value: string | number) => {
    this.setState({ value });
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { prefixCls, className, shape, type, block, disabled, children } = this.props;
    const { value } = this.state;

    const items = React.Children.map(children, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        type,
        shape,
        block: block || element.props.block,
        disabled: disabled || element.props.disabled,
        onChange: () => this.onChildChange(element.props.value),
        checked: value === element.props.value || Number(value) === Number(element.props.value),
      });
    });

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--block`]: block,
      [`${prefixCls}--disabled`]: disabled,
    });

    return <div className={cls}>{items}</div>;
  }
}
