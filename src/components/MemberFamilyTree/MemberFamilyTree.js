import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon/AnimatedLoadingIcon";
import "./MemberFamilyTree.css";

function Node(data, level) {
  this.data = data;
  this.level = level;
  this.children = [];
}
class Tree {
  constructor() {
    this.root = null;
  }
  add(data, toNodeData) {
    const node = new Node(data);
    const parent = toNodeData ? this.findBFS(toNodeData) : null;

    if (parent) {
      node.level = parent.level + 1;
      parent.children.push(node);
    } else {
      if (!this.root) {
        node.level = 0;
        this.root = node;
      } else return "Tried to store node as root when root already exists.";
    }
  }

  findBFS(data) {
    let _node = null;

    this.traverseBFS((node) => {
      if (node.data.id === data.id) {
        _node = node;
      }
    });

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];
    if (cb)
      while (queue.length) {
        const node = queue.shift();

        cb(node);

        for (const child of node.children) {
          queue.push(child);
        }
      }
  }
}

class MemberFamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlRenderMembersTree: [],
      currentLevel: 0,
    };
    this.handleRenderFamilyTree = this.handleRenderFamilyTree.bind(this);
    this.createHtmlForMemberTree = this.createHtmlForMemberTree.bind(this);
    this.handleCreateTreeData = this.handleCreateTreeData.bind(this);
  }
  componentDidMount() {
    this.handleRenderFamilyTree();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.handleRenderFamilyTree();
    }
  }
  handleCreateTreeData(listMembers) {
    const tree = new Tree();
    for (let i = 0; i < listMembers.length; i++) {
      if (!listMembers[i].managedBy) {
        tree.add(listMembers[i]);
        continue;
      }
      tree.add(listMembers[i], listMembers[i].managedBy);
    }
    return [tree.root];
  }
  handleRenderFamilyTree() {
    const { listMembers } = this.props;
    if (listMembers.length <= 0) {
      return;
    }
    const data = this.handleCreateTreeData(listMembers);
    const html = this.createHtmlForMemberTree(data);
    this.setState({
      htmlRenderMembersTree: html,
    });
  }
  handleToggleNodeConnectedArrow(ulRef, index) {
    let ulElement = ulRef.current.querySelectorAll(".list")[index];
    if (ulElement) {
      ulElement.classList.toggle("isActive");
      return;
    }
    ulElement = ulRef.current.querySelector(".list");
    ulElement && ulElement.classList.toggle("isActive");
  }
  toggleChildren(e, liRef, level) {
    e.stopPropagation();
    let i = setTimeout(() => {
      const element = liRef.current;
      let liTagsElement = element.querySelectorAll(`.level${level}_${level}`);
      liTagsElement.forEach((el) => {
        if (el.style.display === "none") {
          el.style.animation = "showChild 1s linear";
          el.style.display = "inline-table";
        } else {
          el.style.animation = "hideChild .5s ";
          let a = setTimeout(() => {
            el.style.display = "none";
            clearTimeout(a);
          }, 500);
        }
      });
      clearTimeout(i);
    }, 500);
  }

  handleToggleChildren(e, liRef, nextLevel, ulRef, index) {
    this.handleToggleNodeConnectedArrow(ulRef, index);
    this.toggleChildren(e, liRef, nextLevel);
  }
  createHtmlForMemberTree(children) {
    const ulRef = React.createRef();
    const output = (
      <ul ref={ulRef} className="list">
        {children.map((child, index) => {
          const liTagRef = React.createRef();
          return (
            <li
              ref={liTagRef}
              className={`level${child.level}_${child.level}`}
              style={{ display: child.level === 0 ? "inline-table" : "none" }}
              key={child.data.id}
              onClick={(e) =>
                this.handleToggleChildren(
                  e,
                  liTagRef,
                  child.level + 1,
                  ulRef,
                  index
                )
              }
            >
              <NavLink to="#">
                <img className="nodeAvatar" src={child.data.picture} alt="" />
                <div className="nodeDetails">
                  <p>{child.data.name} </p>
                  <p>
                    {child.children.length > 0 ? `${child.data.leaderOf}` : " "}
                  </p>
                </div>
              </NavLink>
              {child.children.length > 0
                ? this.createHtmlForMemberTree(child.children)
                : ""}
            </li>
          );
        })}
      </ul>
    );
    return output;
  }

  render() {
    const { htmlRenderMembersTree } = this.state;
    const { isLoading } = this.props;
    return (
      <>
        {!isLoading ? (
          <div className="treeWrap">{htmlRenderMembersTree}</div>
        ) : (
          <AnimatedLoadingIcon />
        )}
      </>
    );
  }
}

export default MemberFamilyTree;
