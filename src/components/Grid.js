import React, { Component } from "react";
import {Link} from "react-router-dom";
import GridItem from "./GridItem";
import ImageElement from "./ImageElement";

class Grid extends Component {
	state = {items: []}
	componentDidMount () {
		if (this.props.endpoint) {
			this.setState({items: []});
			this.getData(this.props.endpoint);
		}
	}
	componentDidUpdate (prevProps) {
		var _props = this.props;
		if (_props.endpoint !== prevProps.endpoint) {
			this.setState({items: []});
			this.getData(_props.endpoint);
		}
	}
	getData (url) {
		fetch(url)
			.then(res => res.json())
				.then (items => {
					this.setState({items: items})
				})
	}
	capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	render () {
		return (
			<section className="grid">
				<div className="grid_items">
					{this.state.items.map((item, k) => {
						return (
							<GridItem key={k} ref_id={item.ref_id} table={item.table}>
								{griditem => (
									<Link to={griditem.url}>
										<ImageElement ref_id={griditem.cover_img} />
										<div className="container">
											<div className="content">
												<h3>
													{griditem.subtitle && <span className="subtitle">
														{griditem.subtitle} -
														<br />
													</span>}
													{griditem.title && <span className="title">
														{griditem.title}
													</span>}
												</h3>
												<p className="date">{griditem.date}</p>
												<div className="grid_item_sidebar">
													<p>
														{griditem.category && <span>
															{this.capitalizeFirstLetter(griditem.category)}
															<br/>
														</span>}
														{griditem.type && <span>
															{this.capitalizeFirstLetter(griditem.type)}
														</span>}
													</p>
												</div>
											</div>
										</div>
									</Link>
								)}
							</GridItem>
						)
	                })}
				</div>
			</section>
		);
	}
}

export default Grid;
