import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './search.css';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    const buildMentorsOptions = this.buildMentorsOptions();
    this.state = { mentors: buildMentorsOptions };
  }

  buildMentorsOptions() {
    const { data: { mentors } } = this.props;
    const options = [];
    Object.keys(mentors).forEach((mentor) => {
      options.push({
        value: mentors[mentor].github,
        label: mentor,
      });
    });
    options.sort((f, s) => {
      if (f.label < s.label) {
        return -1;
      }
      return 1;
    });
    return options;
  }

  render() {
    const { mentors } = this.state;
    const { selected, onSelect } = this.props;
    return (
      <div className="mentors_select">
        <Select
          options={mentors}
          defaultValue={selected}
          onChange={onSelect}
        />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  selected: PropTypes.objectOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
};

SearchContainer.defaultProps = {
  data: {},
  selected: {},
};

export default SearchContainer;
