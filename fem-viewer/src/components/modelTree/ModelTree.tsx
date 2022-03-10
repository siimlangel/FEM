import React, { CSSProperties, useState } from "react";
import { Resizable, ResizeCallbackData } from "react-resizable";
import useFEM from "../../state/useFEM";
import Header from "../header/Header";
import styles from "./modelTree.module.css";
import sharedStyles from "../../utlitity/sharedStyles.module.css";
import Model from "../../state/types/Model";

const itemPreStylesIfSelected: CSSProperties = {
	backgroundColor: "red",
};

const itemStylesIfSelected: CSSProperties = {
	textDecoration: "underline",
};

const ModelTree = () => {
	const { getModelTree, setCurrentModel, getCurrentModel } = useFEM();

	const [state, setState] = useState(() => {
		return {
			height: 0.75 * window.innerHeight,
		};
	});

	const onResize = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
		setState((prevState) => {
			return {
				...prevState,
				height: data.size.height,
			};
		});
	};

	const isCurrentModelSelected = (model: Model): boolean => {
		return model.id === getCurrentModel()?.id;
	};

	const getStylesIfSelected = (
		model: Model,
		stylesIfSelected: CSSProperties
	): CSSProperties => {
		if (isCurrentModelSelected(model)) {
			return stylesIfSelected;
		}

		return {};
	};

	return (
		<div>
			<Resizable
				width={0}
				height={state.height}
				handle={
					<div
						className={
							styles["model-tree-handle"] +
							" " +
							sharedStyles["handle"]
						}
					></div>
				}
				onResize={onResize}
			>
				<div
					className={styles["model-tree-container"]}
					style={{ height: state.height }}
				>
					<Header>
						<div>Model Tree</div>
					</Header>
					<div className={styles["model-tree-content"]}>
						{getModelTree().map((model) => (
							<div
								className={styles["model-tree-item-container"]}
								key={model.id}
								onClick={() => {
									setCurrentModel(model.id);
								}}
							>
								<div
									className={styles["model-tree-item-pre"]}
									style={getStylesIfSelected(
										model,
										itemPreStylesIfSelected
									)}
								></div>
								<p
									className={styles["model-tree-item"]}
									style={getStylesIfSelected(
										model,
										itemStylesIfSelected
									)}
								>
									{model.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</Resizable>
		</div>
	);
};

export default ModelTree;
