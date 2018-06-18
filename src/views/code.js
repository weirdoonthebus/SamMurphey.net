import React, { Component } from "react";
import ScrollToTop from "../components/ScrollToTop";
import Intro from "../components/Intro";
import Grid from "../components/Grid";

class CodePage extends Component {
	state = {anim: "page-enter"}

	componentWillUnmount () {
		this.setState({anim: "page-leave"});
	}

	render () {
		var url = "https://sammurphey.net/api/index.php?category=code&&sort_by=date&sort_dir=DESC";
		return (
			<article id="code_page" className={this.state.anim} key="code_page">
				<ScrollToTop />
				<Intro title="Code" />

				<Grid endpoint={url} />
			</article>
		);
	}
}

export default CodePage;
