import React, { Component } from "react";
import Intro from "../components/Intro";
import CategoryPreview from "../components/CategoryPreview";
import Grid from "../components/Grid";
import Footer from "../components/Footer";

class OverviewView extends Component {
	state = {
		anim: "page-enter",
		gridTitle: false,
		gridDesc: false,
		data: []
	}
	componentDidMount () {
		if (this.props.table && this.props.ref_id)
		this.getData();
	}
	componentDidUpdate (prevProps) {
		const _props = this.props;
		if (_props.table !== prevProps.table || _props.ref_id !== prevProps.ref_id) {
			this.getData();
		}
	}
	componentWillUnmount () {
		this.setState({anim: "page-leave"});
	}
	getData () {
		console.log("getting overview data")
		var url = "https://sammurphey.net/api/index.php?table=" + this.props.table + "&id=" + this.props.ref_id + "&public=true";
		fetch(url)
			.then(res => res.json())
				.then((data) => {
					this.setState({"data": data});
					console.log(this.state.data);
				})
	}
	render () {
		return (
			<div className="category_view">
				<article className={this.state.anim}>
					<Intro title={this.props.title} data={this.props.data} />
					{this.state.data && <div>
						{this.state.data.category && <CategoryPreview category={this.state.data.category} />}
						{this.state.gridTitle && <div className="panel">
							<h2>{this.state.gridTitle}</h2>
							{this.state.gridDesc && <p>
								{this.state.gridDesc.map((string, k) => {
									return (
										<span key={k}>
											{string}<br/>
										</span>
									);
								})}
							</p>}
						</div>}
						{this.state.gridUrl && <Grid endpoint={this.state.gridUrl} />}
					</div>}
				</article>
				<Footer />
			</div>
		)
	}
}
export default OverviewView;
