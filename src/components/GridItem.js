import React, {Component} from "react";

class GridItem extends Component {
	state = {
		category: "",
		cover_img: "",
		date: "",
		img_id: "",
		url: "",
		title: "",
		subtitle: ""
	}
	componentDidMount() {
		if (this.props.ref_id && this.props.table) {
			this.getData(this.props.ref_id, this.props.table)
		}
	}
	componentDidUpdate(prevProps) {
		const _props = this.props;
		if (_props.ref_id !== prevProps.ref_id || _props.table !== prevProps.table) {
			this.getData(_props.ref_id, _props.table);
		}
	}
	getData(ref_id, table) {
		if (ref_id && table) {
			fetch("https://sammurphey.net/api/index.php?table=" + table + "&id=" + ref_id)
				.then(res => res.json())
					.then((data) => {
						var item = data[0];
						this.setState({
							category: item.category || "",
							color: item.color || "",
							cover_img: item.cover_img,
							date: item.date,
							img_id: item.cover_img,
							url: item.url,
							title: item.title,
							subtitle: item.artists || item.client
						});
					})
		}
	}
	render() {
		return (
			<div className="grid_item">
				{this.props.children(this.state)}
			</div>
		)
	}
}

export default GridItem;
