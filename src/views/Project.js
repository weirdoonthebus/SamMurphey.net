import React, { Component } from "react";
import {Link, Switch} from "react-router-dom";
import Intro from "../components/Intro";
import CategoryPreview from "../components/CategoryPreview";
import Grid from "../components/Grid";
import ImageElement from "../components/ImageElement";
import Footer from "../components/Footer";
import TabGroup from "../components/TabGroup";

class ProjectView extends Component {
	state = {
		anim: "page-enter",
		gridTitle: false,
		gridDesc: false,
		data: [],
		songs: [],
		view: "project",
		now_playing: false
	}
	componentDidMount () {
		if ((this.props.table && this.props.ref_id) || this.props.category === "all") {
			this.getData();
		}
		var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
		if (vars.now_playing) {
			this.setState({"now_playing": vars.now_playing});
		}
	}
	componentDidUpdate (prevProps) {
		const _props = this.props;
		if (_props.table !== prevProps.table || _props.ref_id !== prevProps.ref_id) {
			this.getData();
		}
	}
	componentWillUnmount () {
		this.setState({"anim": "page-leave"});
	}
	playTrack (e, name) {
		console.log("playing: " + name);
		this.setState({"now_playing": name});
	}
	getData () {
		console.log("getting project data");
		var url = "https://sammurphey.net/api/index.php?table=" + this.props.table + "&id=" + this.props.ref_id + "&public=true";
		console.log(url);
		fetch(url)
			.then(res => res.json())
				.then((data) => {
					if (data.length === 0) {
						data = false;
					} else if (data.length === 1) {
						data = data[0];
					}
					console.log(data);
					if (data) {
						if (data.narrative) {
							if (data.narrative.charAt(0) === "[") {
								data.narrative = JSON.parse(data.narrative);
							}
						}
						if (data.description) {
							if (data.description.charAt(0) === "[") {
								data.description = JSON.parse(data.description);
							}
						}
						if (data.credits) {
							if (data.credits.charAt(0) === "[") {
								data.credits = JSON.parse(data.credits);
							}
						}
						if (data.tech_stack) {
							if (data.tech_stack.charAt(0) === "[") {
								data.tech_stack = JSON.parse(data.tech_stack);
							}
						}
						if (data.song_ids) {
							data.song_ids = JSON.parse(data.song_ids)
						}
						if (data.keywords) {
							data.keywords = JSON.parse(data.keywords);
						}
						this.setState({"data": data});
						console.log(this.state.data);
						if (this.state.data.song_ids) {
							this.getSongs()
						}
						if (this.state.data.album_id) {
							console.log("is a song")
							const name = this.state.data.name;
							this.setState({"now_playing": name});
						}
					}
				})

	}
	getSongs() {
		console.log("getting songs...");
		var ids = this.state.data.song_ids;
	//	console.log(ids);
		ids.map((id, k) => {
			var url = "https://sammurphey.net/api/index.php?table=songs&id=" + id + "&public=true";
			fetch(url)
				.then(res => res.json())
					.then((data) => {
						//console.log(data);

						var songs = this.state.songs;
						//console.log(data[0]);
						songs[k] = data[0];
						this.setState({"songs": songs});
					})
		})
	}
	render () {
		return (
			<div className="project_view">
				<article className={this.state.anim}>
					<Intro title={this.props.title} data={this.state.data} view={this.state.view} now_playing={this.state.now_playing}/>
					{this.state.data && <div className="has_data">

					{/* music */}
						{this.state.data.category === "music" && <div className="music_view">
							{this.state.data.song_ids && <div className="album_view panel_wrapper">
								{this.state.songs && <div className="song_list panel">
								<h2>Tracklist</h2>
									<ol>
										{this.state.songs.map((song, k) => {
											return (
												<li key={k}><Link to={window.location.pathname + "?now_playing=" + song.name} onClick={((e) => this.playTrack(e, song.name))}>{song.title}</Link></li>
											)
										})}
									</ol>
								</div>}
								<TabGroup data={this.state.data} now_playing={this.state.now_playing} />
							</div>}
							{!this.state.data.song_ids && <div className="single_view panel_wrapper">
								<TabGroup data={this.state.data} now_playing={this.state.now_playing} />
							</div>}
						</div>}

					{/* code */}
						{this.state.data.category === "code" && <div className="code_view">
							{this.state.data.narrative && <div className="narrative_view">
								{Array.isArray(this.state.data.narrative) && <div>
									{this.state.data.narrative.map((row, k) => {
										return ( <div key={k} className="panel_wrapper">
											{row.map((item, k) => {
												console.log(item);
												var para = false,
													img = false,
													cl = "";
												if (item["p"]) {
													para = true;
													cl = "text_elem";
												}
												if (item["i"]) {
													img = true;
													cl = "img_elem";
												}
												return ( <div key={k} className={"panel " + cl}>
													{para && !Array.isArray(item["p"]) && <p>{item["p"]}</p>}
													{para && Array.isArray(item["p"]) && <div>
														{item["p"].map((str, k) => {
															return (
																<p key={k}>{str}</p>
															)
														})}
													</div>}
													{img && <ImageElement ref_id={item["i"]}/>}
												</div>)
											})}
										</div>)
									})}
								</div>}
							</div>}
						</div>}

					{/* meta */}
						<div className="metadata_view panel_wrapper">
							<div className="panel">
								<h2>Metadata</h2>
								{this.state.data.credits && <p className="subtitle">Credits: {Array.isArray(this.state.data.credits) &&
								<span>
									{this.state.data.credits.map((string, k) => {
										return (
											<span key={k}>
												{string}<br/>
											</span>
										);
									})}
								</span>}
								{!Array.isArray(this.state.data.credits) &&
								<span>
									{this.state.data.credits}
								</span>}
								</p>}
								{this.state.data.keywords && <p className="subtitle">Keywords: {this.state.data.keywords.map((keyword, k) => {
									var delimiter = ", ";
									//console.log(this.state.data.keywords.length)
									if (k + 1 === this.state.data.keywords.length) {
										delimiter = "";
									}
									return (
										<span key={k}>
											<Link to={"/search/" + keyword}>{keyword}</Link>{delimiter}
										</span>
									)
								})}</p>}
							</div>
						</div>
					</div>}
				</article>
				<Footer />
			</div>
		)
	}
}
export default ProjectView;
